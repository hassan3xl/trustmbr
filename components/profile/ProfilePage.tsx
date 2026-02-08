"use client";

import { useState, useRef } from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Camera,
  Save,
  Loader2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useUpdateProfile, useUpdateAvatar } from "@/lib/hooks/account.hook";

export function ProfilePage() {
  const { user, loading } = useAuth();
  const updateProfile = useUpdateProfile();
  const updateAvatar = useUpdateAvatar();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update local state when user changes
  const handleStartEdit = () => {
    setFirstName(user?.first_name || "");
    setLastName(user?.last_name || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFirstName(user?.first_name || "");
    setLastName(user?.last_name || "");
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    updateProfile.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      updateAvatar.mutate(formData);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <User className="h-10 w-10 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          Please log in to view your profile
        </p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold tracking-wide mb-2">MY PROFILE</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg tracking-wide flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-500" />
                ACCOUNT INFORMATION
              </CardTitle>
              <Badge
                variant="outline"
                className={`${
                  user.role === "admin"
                    ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                }`}
              >
                <Shield className="h-3 w-3 mr-1" />
                {user.role?.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-4 border-border cursor-pointer transition-transform hover:scale-105">
                  {user.avatar_url ? (
                    <AvatarImage src={user.avatar_url} alt={user.full_name} />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-2xl font-bold">
                    {user.full_name?.slice(0, 2).toUpperCase() ||
                      user.email?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarClick}
                  disabled={updateAvatar.isPending}
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
                >
                  {updateAvatar.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-bold mb-1">
                  {user.full_name || "No name set"}
                </h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Profile Details */}
            <div className="space-y-6">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                        First Name
                      </label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        className="bg-background/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                        Last Name
                      </label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        className="bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={updateProfile.isPending}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      disabled={updateProfile.isPending}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {updateProfile.isPending ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-1" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                      <div className="p-3 rounded-lg bg-emerald-500/10">
                        <User className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Full Name
                        </p>
                        <p className="text-sm font-medium">
                          {user.full_name || "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                      <div className="p-3 rounded-lg bg-emerald-500/10">
                        <Mail className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-sm font-medium">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                      <div className="p-3 rounded-lg bg-emerald-500/10">
                        <Shield className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Account Type
                        </p>
                        <p className="text-sm font-medium capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>

                    {user.created_at && (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                        <div className="p-3 rounded-lg bg-emerald-500/10">
                          <Calendar className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Member Since
                          </p>
                          <p className="text-sm font-medium">
                            {new Date(user.created_at).toLocaleDateString(
                              "en-NG",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      onClick={handleStartEdit}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
