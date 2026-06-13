'use client';

import { useState } from "react";
import { createSubmission } from "../lib/actions";
import Step1HateMe from "./steps/Step1HateMe";
import Step2Info from "./steps/Step2Info";
import Step3DoSomething from "./steps/Step3DoSomething";
import Step4WhenFree from "./steps/Step4WhenFree";
import Step5Vibes from "./steps/Step5Vibes";

const TOTAL_STEPS = 5;

export default function DesktopForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    intereses: [] as string[],
    notas: "",
  });

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goTo = (step: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(step);
      setAnimating(false);
    }, 150);
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) goTo(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) goTo(currentStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await createSubmission(formData);
      if (result && !result.success) {
        throw new Error(result.message || "Failed to submit");
      }
    } catch (error) {
      setSubmitting(false);
      throw error;
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-8 py-12">
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="animate-scale-in rounded-3xl border border-pink-100 bg-white p-10 shadow-xl shadow-pink-50/50">
          {/* Form Steps */}
          <div
            className={`min-h-[240px] transition-all duration-300 ${
              animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {currentStep === 0 && (
              <Step1HateMe onNo={nextStep} />
            )}
            {currentStep === 1 && (
              <Step2Info onNext={nextStep} />
            )}
            {currentStep === 2 && (
              <Step3DoSomething onYes={nextStep} />
            )}
            {currentStep === 3 && (
              <Step4WhenFree
                formData={formData}
                updateField={updateField}
                onNext={nextStep}
              />
            )}
            {currentStep === 4 && (
              <Step5Vibes
                formData={formData}
                updateField={updateField}
                onConfirm={handleSubmit}
                onBack={prevStep}
                submitting={submitting}
              />
            )}
          </div>

          {/* No navigation needed — all steps have their own buttons */}
        </div>
      </div>
    </div>
  );
}
