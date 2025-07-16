import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const GetQuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productCategory: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const productCategories = [
   "Protein Powder",
"TABLET",
"tablets",
"Injection"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("http://localhost:4000/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  ...formData,
  product: formData.productCategory, // ✅ Correct key
}),

      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          productCategory: "",
          message: "",
        });
      } else {
        alert("❌ Failed to send quote request.");
      }
    } catch (error) {
      console.error("Error sending quote request:", error);
      alert("❌ Error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, productCategory: value });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6">
        <div className="text-green-600 text-2xl mb-4">✓</div>
        <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
        <p className="text-gray-600">
          Your quote request has been sent. We’ll contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
      <Input
        name="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
      <Input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
      <Select
        onValueChange={handleSelectChange}
        required
        disabled={isSubmitting}
      >
        <SelectTrigger>
          <SelectValue placeholder="Product of Interest" />
        </SelectTrigger>
        <SelectContent>
          {productCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        disabled={isSubmitting}
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Quote Request"}
      </Button>
    </form>
  );
};  
