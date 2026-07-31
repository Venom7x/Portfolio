import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot, FaPaperPlane, FaCircleCheck } from "react-icons/fa6";
import { profile } from "../data/profile";
import { emailjsConfig } from "../utils/emailConfig";
import SectionHeading from "../components/SectionHeading";
import GlassCard from "../components/GlassCard";
import SocialIcons from "../components/SocialIcons";
import FormField from "../components/FormField";
import Button from "../components/Button";

const initialForm = { name: "", email: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please share your name.";
  if (!form.email.trim()) {
    errors.email = "Please share an email so I can reply.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "That email doesn't look quite right.";
  }
  if (!form.subject.trim()) errors.subject = "What's this about?";
  if (!form.message.trim()) errors.message = "Add a short message.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const isConfigured =
      emailjsConfig.serviceId !== "YOUR_EMAILJS_SERVICE_ID" &&
      emailjsConfig.templateId !== "YOUR_EMAILJS_TEMPLATE_ID" &&
      emailjsConfig.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY";

    if (!isConfigured) {
      // No EmailJS credentials wired up yet — fail loudly in dev, but
      // don't leave the visitor's message unacknowledged.
      console.warn("EmailJS isn't configured yet — see src/utils/emailConfig.js");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        form,
        emailjsConfig.publicKey
      );
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          method="POST"
          path="/contact"
          status={201}
          title="Let's build something"
          description="Have a role, a project, or just a question about how something here was built? Send it over — I read every message."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <GlassCard className="p-6 sm:p-8 lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Jane Doe"
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="[email protected]"
                />
              </div>
              <FormField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="Let's collaborate on..."
              />
              <FormField
                label="Message"
                name="message"
                as="textarea"
                value={form.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Tell me a bit about what you have in mind."
              />

              <Button
                as="button"
                type="submit"
                icon={FaPaperPlane}
                disabled={status === "sending"}
                className="w-full justify-center sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </Button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="route-label flex items-center gap-2 text-cyan-soft"
                  >
                    <FaCircleCheck aria-hidden="true" />
                    201 Created — message sent, thanks!
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="route-label text-[#ef7f6f]"
                  >
                    500 Internal Error — email isn&rsquo;t wired up yet. Reach out via the socials below instead.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </GlassCard>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <GlassCard className="p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">Find me elsewhere</h3>
              <p className="mt-1 text-sm text-muted">
                GitHub, LeetCode, LinkedIn — pick whichever fits.
              </p>
              <SocialIcons className="mt-5" />
            </GlassCard>

            <GlassCard className="flex items-center gap-3 p-6 sm:p-8">
              <FaLocationDot aria-hidden="true" className="text-lg text-violet-soft" />
              <div>
                <p className="text-sm font-medium text-ink">Location</p>
                <p className="text-sm text-muted">{profile.location} · Remote-friendly</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
