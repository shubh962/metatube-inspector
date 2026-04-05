"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    
    // REPLACE THIS KEY with the one you get from web3forms.com
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    });
    
    const result = await response.json();
    if (result.success) {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Contact Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question or feedback? Fill out the form below and our developers will get back to you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Direct Email</h3>
                <p className="text-muted-foreground mb-2 text-sm">For business or urgent technical support.</p>
                <a href="mailto:gautamshubham@gmail.com" className="text-primary font-medium hover:underline">
                  gautamshubham@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Response Time</h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond within <strong>24 to 48 hours</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-card border rounded-3xl p-8 shadow-lg relative overflow-hidden">
          {isSuccess ? (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
              <div className="inline-flex p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-muted-foreground">
                Thank you, Shubham. We have received your message and will reach out soon.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-6 text-sm text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input 
                    name="name" 
                    required 
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="name@example.com"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <input 
                  name="subject" 
                  required 
                  placeholder="How can we help?"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea 
                  name="message" 
                  required 
                  rows={4}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-background resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
