"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  FileText,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Upload,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createBusiness } from "@/lib/actions/businesses";

const steps = [
  { id: 1, name: "BUSINESS INFO", icon: Building2 },
  { id: 2, name: "CONTACT", icon: Mail },
  { id: 3, name: "DOCUMENTS", icon: FileText },
  { id: 4, name: "REVIEW", icon: CheckCircle },
];

interface FormData {
  businessName: string;
  industry: string;
  description: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  registrationNumber: string;
  estimatedMonthlyIncome: string;
}

export default function RegisterBusinessPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    description: "",
    location: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    registrationNumber: "",
    estimatedMonthlyIncome: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    const result = await createBusiness({
      name: formData.businessName,
      description: formData.description,
      industry: formData.industry,
      location: formData.location,
      address: formData.address,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || undefined,
      registration_number: formData.registrationNumber,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || "Failed to register business");
      return;
    }

    router.push("/businesses");
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 tracking-wide">
              BUSINESS REGISTRATION
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-wide mb-4">
            REGISTER YOUR BUSINESS
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get verified and build trust with your customers. Complete the form
            below to start the verification process.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
            {error}
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-10" />
            <div
              className="absolute top-6 left-0 h-0.5 bg-emerald-500 -z-10 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-500 text-background"
                        : isCurrent
                          ? "bg-emerald-500/20 text-emerald-500 border-2 border-emerald-500"
                          : "bg-card border border-border text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs tracking-wide hidden sm:block ${
                      isCurrent ? "text-emerald-400" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur animate-scale-in">
          <CardHeader>
            <CardTitle className="text-lg tracking-wide">
              {steps[currentStep - 1].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Business Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide">
                    Business Name *
                  </label>
                  <Input
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) =>
                      updateFormData("businessName", e.target.value)
                    }
                    className="h-12 bg-background/50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Industry *
                    </label>
                    <Input
                      placeholder="e.g., Technology, Healthcare"
                      value={formData.industry}
                      onChange={(e) =>
                        updateFormData("industry", e.target.value)
                      }
                      className="h-12 bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground uppercase tracking-wide">
                      Location *
                    </label>
                    <Input
                      placeholder="e.g., Lagos, Nigeria"
                      value={formData.location}
                      onChange={(e) =>
                        updateFormData("location", e.target.value)
                      }
                      className="h-12 bg-background/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide">
                    Full Address *
                  </label>
                  <Input
                    placeholder="Enter your business address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    className="h-12 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide">
                    Business Description *
                  </label>
                  <textarea
                    placeholder="Describe what your business does..."
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData("description", e.target.value)
                    }
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-sm focus:border-emerald-500 focus:ring-emerald-500/20 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Business Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="contact@yourbusiness.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="h-12 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="h-12 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website (Optional)
                  </label>
                  <Input
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    className="h-12 bg-background/50"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide">
                    Business Registration Number *
                  </label>
                  <Input
                    placeholder="RC-XXXX-XX-XXXX"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      updateFormData("registrationNumber", e.target.value)
                    }
                    className="h-12 bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide">
                    Estimated Monthly Income *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 1000000"
                    value={formData.estimatedMonthlyIncome}
                    onChange={(e) =>
                      updateFormData("estimatedMonthlyIncome", e.target.value)
                    }
                    className="h-12 bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter amount in Naira (₦)
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground uppercase tracking-wide">
                    Upload Documents
                  </label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      CAC Certificate, Tax Documents, Bank Statements
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-4 text-emerald-400 border-emerald-400/30"
                    >
                      Demo Mode - No upload required
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                  <p className="text-sm text-emerald-400">
                    Please review your information before submitting. Our team
                    will verify your business within 2-3 business days.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-background/50 border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        BUSINESS INFO
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="font-medium">
                        {formData.businessName || "Not provided"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formData.industry || "Industry not specified"}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {formData.location || "Location not specified"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50 border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        CONTACT
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm">
                        {formData.email || "Email not provided"}
                      </p>
                      <p className="text-sm">
                        {formData.phone || "Phone not provided"}
                      </p>
                      <p className="text-sm text-emerald-400">
                        {formData.website || "No website"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50 border-border/50 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        REGISTRATION DETAILS
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-sm">
                          {formData.registrationNumber || "RC-XXXX-XX-XXXX"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Registration Number
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400">
                          ₦
                          {parseInt(
                            formData.estimatedMonthlyIncome || "0",
                          ).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Est. Monthly Income
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="tracking-wide"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                PREVIOUS
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  className="bg-emerald-600 hover:bg-emerald-700 tracking-wide"
                >
                  NEXT
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 tracking-wide"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      SUBMIT FOR VERIFICATION
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
