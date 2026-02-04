-- TrustMBR Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BUSINESSES TABLE
-- =====================================================
CREATE TYPE business_status AS ENUM ('pending', 'verified', 'unverified', 'rejected');

CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT,
    registration_number TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    status business_status DEFAULT 'pending',
    trust_score INTEGER DEFAULT 0 CHECK (trust_score >= 0 AND trust_score <= 100),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INCOME RECORDS TABLE (for monthly income history)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.income_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL CHECK (amount >= 0),
    month DATE NOT NULL, -- First day of the month
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(business_id, month)
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_businesses_owner_id ON public.businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status);
CREATE INDEX IF NOT EXISTS idx_income_records_business_id ON public.income_records(business_id);
CREATE INDEX IF NOT EXISTS idx_income_records_month ON public.income_records(month);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.income_records ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can read all profiles (public info)
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Profile is created via trigger (not direct insert)
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- BUSINESSES POLICIES
-- Everyone can view verified businesses
CREATE POLICY "Verified businesses are viewable by everyone" ON public.businesses
    FOR SELECT USING (status = 'verified' OR owner_id = auth.uid());

-- Only owner can view their pending/unverified businesses
CREATE POLICY "Owners can view all their businesses" ON public.businesses
    FOR SELECT USING (owner_id = auth.uid());

-- Users can create businesses
CREATE POLICY "Authenticated users can create businesses" ON public.businesses
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Only owner can update their business
CREATE POLICY "Owners can update their businesses" ON public.businesses
    FOR UPDATE USING (owner_id = auth.uid());

-- Only owner can delete their business
CREATE POLICY "Owners can delete their businesses" ON public.businesses
    FOR DELETE USING (owner_id = auth.uid());

-- INCOME RECORDS POLICIES
-- Income records visible for verified businesses or own businesses
CREATE POLICY "Income records viewable for verified businesses" ON public.income_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.businesses b 
            WHERE b.id = business_id 
            AND (b.status = 'verified' OR b.owner_id = auth.uid())
        )
    );

-- Business owners can manage their income records
CREATE POLICY "Owners can manage income records" ON public.income_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.businesses b 
            WHERE b.id = business_id AND b.owner_id = auth.uid()
        )
    );

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ADMIN POLICIES (for admin users)
CREATE POLICY "Admins can do everything on businesses" ON public.businesses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can do everything on income_records" ON public.income_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
