import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import {
  Star,
  Quote,
  Heart,
  Users,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import sekarTestimonial from "figma:asset/b9580a1a6061b0dffa7f08af9001fb8413df0b69.png";
import herwidaTestimonial from "figma:asset/d1ce84868826ba456c2b53d882ad1be195a79c89.png";
import amandaTestimonial from "figma:asset/d11f12a939b767d21ee5222f4cbe5bf8a2aff374.png";
import junichoTestimonial from "figma:asset/a6f0ddb81e590a0a07803353e951d0c99bb6599e.png";
import trisnoTestimonial from "figma:asset/4ef0371fe4062c6f560441fd481a71819d626733.png";
import putriAyandaTestimonial from "figma:asset/28266063acbd1f008c32bc916107197bda3e2f91.png";
import tianSupraptoTestimonial from "figma:asset/55deb8c73d9167b14894b144121d828793081bb4.png";
import dianaIrawatiTestimonial from "figma:asset/e903ff9c7e6e7ed63daebebcf7999410c51e387b.png";
import meiriawanSulistyoTestimonial from "figma:asset/b70012c41137cc8964b2e6fad3cf733a18601197.png";
import lintangKejoraTestimonial from "figma:asset/117b860000bfad5cf0314db9dc03a213eec5386c.png";
import bethVenuseyesTestimonial from "figma:asset/f1769ac298d1ee08858b8a0063ea4b9bbd6b66f7.png";
import hartatiWidiyaningsihTestimonial from "figma:asset/e74ba735e3682b39872fcb54d431eb8b30f33b2d.png";
import dzakiAndreazTestimonial from "figma:asset/59f30935289466cf97f35f9bbe64aff91d38705a.png";
import arifahPutriTestimonial from "figma:asset/e9fa8df87b3a7c3abaf9f43950716a3d367d95e8.png";
import aditiaFebrianaTestimonial from "figma:asset/ef87323988268e08bb5a397b99e34f0e871e9e23.png";
import dwiGayatriTestimonial from "figma:asset/7875480a5537d87ffc7ec068d3ea083964aff443.png";
import wiwikAryatiTestimonial from "figma:asset/4f358a61bf642645c137614a149adb4ba0942271.png";

// Authentic Google Reviews testimonials only - Randomized for varied masonry layout
const testimonials = [
  {
    id: 16,
    name: "Lintang Kejora",
    role: "5 reviews • 1 photo",
    company: "Google Reviews • a month ago",
    text: "SERU BAAAANGET BELAJAR JADI ANNOUNCER RADIO DI STC!! kakak kakaknya ramaaah dan trainernya sangat membantu 🥰 ...",
    rating: 5,
    image: lintangKejoraTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 3,
    name: "Amanda Purwanto",
    role: "Public Speaking Alumni",
    company: "Google Reviews • 1 year ago",
    text: "Saya suka kelas public speaking program yang basic di STC. Kelasnya sangat menyenangkan dan interaktif. Teori dan praktek juga sangat seimbang dan trainernya juga sangat ramah dan profesional. Setelah mengikuti program ini, saya jadi lebih percaya diri untuk bicara di depan umum.",
    rating: 5,
    image: amandaTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 22,
    name: "Dwi Gayatri",
    role: "6 reviews • 2 photos",
    company: "Google Reviews • a month ago",
    text: "",
    rating: 5,
    image: dwiGayatriTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 13,
    name: "Tian Suprapto SE MM",
    role: "4 reviews • 4 photos",
    company: "Google Reviews • a month ago",
    text: "Sangat memberikan wawasan dan skill public speaking dengan baik",
    rating: 5,
    image: tianSupraptoTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 19,
    name: "Dzaki Andreaz",
    role: "3 reviews",
    company: "Google Reviews • a month ago",
    text: "Penjelasan dari mentor mudah dipahami",
    rating: 5,
    image: dzakiAndreazTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 1,
    name: "Sekar Fitriadzini Istiqomah",
    role: "Local Guide",
    company: "Google Reviews • 2 years ago",
    text: "I have a fun and interesting experience when join the Public Speaking (PC) Course. There are 3 level of PC classes: Basic, Advance, and Professional. I had joined the first level and it's really worth your time ☺️",
    rating: 5,
    image: sekarTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 18,
    name: "Hartati Widiyaningsih",
    role: "Google User",
    company: "Google Reviews • a month ago",
    text: "Response from the owner 4 weeks ago: Terima kasih kak 🙏😊 ...",
    rating: 5,
    image: hartatiWidiyaningsihTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 5,
    name: "trisno sutrisno",
    role: "Basic & Advance Alumni",
    company: "Google Reviews • 3 years ago",
    text: "Ambil kelas Public Speaking Basic dan Advance, one of best learning classes!",
    rating: 5,
    image: trisnoTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 21,
    name: "Aditia Febriana",
    role: "8 reviews",
    company: "Google Reviews • a month ago",
    text: "",
    rating: 5,
    image: aditiaFebrianaTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 14,
    name: "Diana Irawati Wulandari",
    role: "12 reviews • 1 photo",
    company: "Google Reviews • 3 weeks ago",
    text: "sangat membantu dalam mempelajari public speaking, kelas nyaman, asik, seru, penjelasan nya cukup jelas",
    rating: 5,
    image: dianaIrawatiTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 23,
    name: "Wiwik Aryati",
    role: "32 photos",
    company: "Google Reviews • a month ago",
    text: "Response from the owner 4 weeks ago: Terima kasih kak 🙏😊 ...",
    rating: 5,
    image: wiwikAryatiTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 4,
    name: "Junicho Deni Priyantomo",
    role: "Program Participant",
    company: "Google Reviews • 3 years ago",
    text: "Its a good place to learning about public speaking, you will get many insight in here. Do not worry spending your money to add more value to yourself, it is worthed",
    rating: 5,
    image: junichoTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 17,
    name: "Beth Venuseyes L",
    role: "Local Guide • 17 reviews • 5 photos",
    company: "Google Reviews • 3 weeks ago",
    text: "Terimakasih stc, dan mba dwi untuk ilmu publik speaking nya semoga bisa bermanfaat untuk ku",
    rating: 5,
    image: bethVenuseyesTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 20,
    name: "Arifah Putri Wulandari",
    role: "2 reviews • 2 photos",
    company: "Google Reviews • a month ago",
    text: "",
    rating: 5,
    image: arifahPutriTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 12,
    name: "Putri Ayanda",
    role: "Local Guide",
    company: "Google Reviews • 3 weeks ago",
    text: "Seneng banget ikut public speaking disini, tentor kak dwi yang imut imut, sangat informatif, tidak pelit ilmu, sangat cheerful, punya banyak temen dan relasi, kalian harus coba kesini yaaa 🥰",
    rating: 5,
    image: putriAyandaTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 2,
    name: "Herwida Putri Agista",
    role: "Program Alumni",
    company: "Google Reviews • 1 month ago",
    text: "Fasilitas pembelajaran yang sangat baik. Mentor, ruangan, layanan, dan lain-lain yang diberikan dengan tulus oleh stafnya.",
    rating: 5,
    image: herwidaTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
  {
    id: 15,
    name: "Meiriawan Sulistyo Indriastanto",
    role: "1 review",
    company: "Google Reviews • a month ago",
    text: "kereeen, sangat berharga tempat utk melatih kemampuan wicara selama mengikuti kelas MC, mentor yg dahsyat dan berpengalaman, telaten dan sanngat mengena materinya...ubur ubur dalam salju...mg swaragama terus melaju uuu...maturnuwun",
    rating: 5,
    image: meiriawanSulistyoTestimonial,
    isGoogleReview: true,
    platform: "Google Reviews",
  },
];

// Testimonials data - Ready for new content  
interface TestimonialProps {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: string;
  isGoogleReview?: boolean;
  platform?: string;
}

export function Testimonials() {

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-background via-accent/30 to-background relative overflow-hidden testimonials-container"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Testimonial
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kata{" "}
            <span className="text-primary">Sahabat STC</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Dengarkan cerita sukses dari para sahabat yang telah
            merasakan manfaat program pengembangan SDM dari
            Swaragama Training Center.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 sm:divide-x divide-border/40 bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl px-4 sm:px-8 py-4 shadow-sm max-w-2xl mx-auto">
            <div className="text-center px-3 sm:px-6">
              <div className="text-xl sm:text-2xl text-primary">
                4.9/5
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Rating Kepuasan
              </div>
            </div>
            <div className="text-center px-3 sm:px-6">
              <div className="text-xl sm:text-2xl text-primary">
                200+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Klien Puas
              </div>
            </div>
            <div className="text-center px-3 sm:px-6">
              <div className="text-xl sm:text-2xl text-primary">
                1000+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Alumni Success
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Collage */}
        <div className="relative">
          {/* Testimonials Masonry Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="relative bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 testimonials-card break-inside-avoid mb-6"
            >
              {/* Google Review Screenshot Layout */}
              <div className="p-4 dark:bg-white dark:rounded-lg">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={`Google Review by ${testimonial.name}`}
                  className="w-full h-auto rounded-lg border border-border/30"
                />
              </div>

              {/* Trust Badge for Google Reviews */}
              <div className="absolute -top-2 -left-2">
                
              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        ></motion.div>
      </div>
    </section>
  );
}