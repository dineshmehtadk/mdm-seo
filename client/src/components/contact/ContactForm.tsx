// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";
// import { apiRequest } from "@/lib/queryClient";

// const formSchema = z.object({
//   firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
//   lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
//   email: z.string().email({ message: "Please enter a valid email address." }),
//   company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
//   subject: z.string().min(1, { message: "Please select a subject." }),
//   message: z.string().min(10, { message: "Message must be at least 10 characters." }),
//   privacyPolicy: z.boolean().refine(val => val === true, {
//     message: "You must agree to the privacy policy.",
//   }),
// });

// type FormValues = z.infer<typeof formSchema>;

// const ContactForm = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//  const [buttonOffset, setButtonOffset] = useState(0);
// const [isFormValid, setIsFormValid] = useState(false);


//   const { toast } = useToast();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       company: "",
//       subject: "",
//       message: "",
//       privacyPolicy: false,
//     },
//   });

//   const onSubmit = async (data: FormValues) => {
//     setIsSubmitting(true);
//     try {
//       await apiRequest("POST", "/api/contact", data);
//       toast({
//         title: "Message sent",
//         description: "Thank you for your message. We'll get back to you soon.",
//       });
//       form.reset();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "There was an error sending your message. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//  const onSubmitAttempt = async () => {
//   const isValid = await form.trigger();
//   if (!isValid) {
//     // Move button to a random position between 0 and 150px
//     // const randomOffset = Math.floor(Math.random() * 150);
//     // setButtonOffset(randomOffset);
//     const randomOffset = Math.floor(Math.random() * 300) - 150; // between -150 and +150
// setButtonOffset(randomOffset);
//     return;
//   }

//   // If valid, proceed with submission
//   onSubmit(form.getValues());
// };

//   return (
//     <div className="bg-neutral-50 p-8 rounded-lg shadow-sm">
//       <h3 className="text-xl font-bold mb-6 text-neutral-800">Send Us a Message</h3>
//       <Form {...form}>
//         {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> */}
//         <form onSubmit={(e) => {
//   e.preventDefault();
//   onSubmitAttempt();
// }} className="space-y-6">



//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="firstName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>First Name*</FormLabel>
//                   <FormControl>
//                     <Input placeholder="John" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lastName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Last Name*</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Doe" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email Address*</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="john.doe@example.com" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="company"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Company Name*</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Acme Inc." {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="subject"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Subject*</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a subject" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="sales">Sales Inquiry</SelectItem>
//                     <SelectItem value="support">Technical Support</SelectItem>
//                     <SelectItem value="demo">Request a Demo</SelectItem>
//                     <SelectItem value="partnership">Partnership Opportunity</SelectItem>
//                     <SelectItem value="other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="message"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Message*</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="How can we help you?"
//                     className="resize-none"
//                     rows={4}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* <FormField
//             control={form.control}
//             name="privacyPolicy"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
//                 <FormControl>
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//                 <div className="space-y-1 leading-none">
//                   <FormLabel className="text-sm text-neutral-600">
//                     I agree to the <a href="#" className="text-primary hover:underline">Privacy Policy</a> and consent to be contacted regarding my inquiry.
//                   </FormLabel>
//                   <FormMessage />
//                 </div>
//               </FormItem>
//             )}
//           /> */}

//           {/* <Button type="submit" className="w-full hover:scale-95 transition-transform duration-200" disabled={isSubmitting} >
//             {isSubmitting ? "Sending..." : "Send Message"}
//           </Button> */}
//         <div className="relative h-14">
//   <Button
//     type="submit"
//     className="absolute transition-all duration-300"
//     style={{ left: `${buttonOffset}px` }}
//     disabled={isSubmitting}
//   >
//     {isSubmitting ? "Sending..." : "Send Message"}
//   </Button>
// </div>

//         </form>
//       </Form>
//     </div>
//   );
// };

// export default ContactForm;
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  subject: z.string().min(1),
  message: z.string().min(10),
  privacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offset, setOffset] = useState(0);
  const [directionRight, setDirectionRight] = useState(true);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      privacyPolicy: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent",
        description: "We'll get back to you soon.",
      });
      form.reset();
      setOffset(0);
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      onSubmit(form.getValues());
    }
  };

  const handleMouseEnter = () => {
    if (form.formState.isValid) return;

    const newOffset = directionRight ? 250 : -250;
    setOffset(newOffset);
    setDirectionRight(!directionRight);
  };

  useEffect(() => {
    if (form.formState.isValid) {
      setOffset(0); // reset position when valid
    }
  }, [form.formState.isValid]);

  return (
    <div className="bg-neutral-50 px-8 py-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="demo">Demo</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message..." rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         <FormField
            control={form.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm text-neutral-600">
                    I agree to the <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and consent to be contacted regarding my inquiry.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          /> 

          <div className="relative h-20 overflow-hidden">
            <div className="w-full flex justify-center relative">
              <Button
                type="submit"
                onMouseEnter={handleMouseEnter}
                disabled={isSubmitting}
                className="transition-all duration-300 absolute w-full"
                // style={{ transform: `translateX(${offset}px)` }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
