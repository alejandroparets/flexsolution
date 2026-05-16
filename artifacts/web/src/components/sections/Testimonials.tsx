import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { translations } from "@/i18n";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? "fill-[#FBBC04] text-[#FBBC04]" : "text-muted-foreground"}
        />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function Testimonials() {
  const { lang } = useLang();
  const t = translations.testimonials[lang];

  const googleReviewUrl = "https://search.google.com/local/reviews?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4";

  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">

        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FBBC04]/40 bg-[#FBBC04]/10 px-3 py-1 text-sm font-medium text-foreground mb-6">
            <GoogleIcon />
            {t.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.heading}</h2>
          <p className="text-lg text-muted-foreground">{t.subheading}</p>
        </div>

        {/* Overall rating bar */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4 bg-card border rounded-2xl px-8 py-4 shadow-sm">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-foreground leading-none">5.0</div>
              <StarRating count={5} />
              <p className="text-xs text-muted-foreground mt-1">Google Reviews</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <GoogleIcon />
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {t.reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              {/* Reviewer info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                  {review.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <GoogleIcon />
              </div>

              {/* Stars */}
              <StarRating count={review.rating} />

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{review.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary/30 text-primary font-semibold hover:bg-primary/5 transition-colors"
          >
            <GoogleIcon />
            {t.cta}
          </a>
        </div>

      </div>
    </section>
  );
}
