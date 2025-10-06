import { motion } from "motion/react";
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// import rizaPerdanaImage from 'figma:asset/8888414b754c45b3bca93fd592b905b78c4d9eb0.png'; // Removed - using placeholder for Arifah Putri
import dinaAliaImage from "figma:asset/c8baad4591184d53739c44fce8251d645a26dfba.png";
import gideonSuryaImage from "figma:asset/871de5d47f17959015a2e35c50978cacad5554a5.png";
import ayuRizqiaImage from "figma:asset/d6f038256d02889e1754c8166f77224e3395fa5c.png";
import ciciPriskilaImage from "figma:asset/4914657de6f24181ab27fb5212d4f265ca6ab702.png";
import dwiGyatriImage from "figma:asset/c061b7f290d37fa4f56d4858e5fd8f6c4657cef2.png";
import berthaVirginiaImage from "figma:asset/e1e7db4167e495c34171a171f2f9b2670ff9db4d.png";
import baraZulfaImage from "figma:asset/bed40278f61f267aaf527acc07a44275c3d31b6b.png";
import kaniRarasImage from "figma:asset/9703cd440b00ded107262c50b6904eb2b9fc462c.png";

export function Trainers() {
  const trainers = [
    {
      name: "Dwi Gayatri",
      title: "Professional Public Speaker & Trainer",
      image: dwiGyatriImage,
    },
    {
      name: "Gideon Surya",
      title: "Professional Trainer & Speaker",
      image: gideonSuryaImage,
    },
    {
      name: "Ayu Rizqia",
      title: "HR Development & Professional Speaker",
      image: ayuRizqiaImage,
    },
    {
      name: "Bara Zulfa",
      title: "Professional MC, Presenter & Voice Over Talent",
      image: baraZulfaImage,
    },
    {
      name: "Dina Alia",
      title: "Professional Broadcaster & Voice Over Talent",
      image: dinaAliaImage,
    },
    {
      name: "Cici Priskila",
      title: "Professional Broadcaster & Voice Over Talent",
      image: ciciPriskilaImage,
    },
    {
      name: "Bertha Virginia",
      title: "Professional MC & Voice Over Talent",
      image: berthaVirginiaImage,
    },
    {
      name: "Nicky Shaquilla",
      title: "Professional Broadcaster & MC",
      image: "",
    },
    {
      name: "Kani Raras",
      title: "Professional Broadcaster & MC",
      image: kaniRarasImage,
    },
    {
      name: "Arifah Putri",
      title: "Professional Public Speaker",
      image: "",
    },
  ];

  // Trainer dengan posisi foto khusus
  const trainerPositions = {
    "Dina Alia": "object-[center_35%]",
    "Dwi Gayatri": "object-[center_40%]",
    "Bertha Virginia": "object-[center_15%]",
    "Bara Zulfa": "object-[center_25%]",
    "Arifah Putri": "object-top",
    "Gideon Surya": "object-top",
    "Nicky Shaquilla": "object-top",
  };

  return (
    <section
      id="trainers"
      className="py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Trainer Kami
          </Badge>
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Belajar dari Para{" "}
            <span className="text-primary">Expert Terbaik</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tim trainer berpengalaman dan tersertifikasi yang
            siap membimbing Anda mencapai potensi maksimal dalam
            komunikasi dan pengembangan diri.
          </p>
        </motion.div>

        {/* Modern Trainers Slider */}
        <div className="relative group">
          {/* Clean Navigation Arrows */}
          <button
            onClick={() => {
              const container = document.getElementById(
                "trainers-slider",
              );
              if (container) {
                container.scrollBy({
                  left: -350,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-card/90 backdrop-blur-sm hover:bg-card border border-border/50 hover:border-primary/30 text-foreground rounded-xl items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 -translate-x-6 hover:-translate-x-4 hidden lg:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              const container = document.getElementById(
                "trainers-slider",
              );
              if (container) {
                container.scrollBy({
                  left: 350,
                  behavior: "smooth",
                });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-card/90 backdrop-blur-sm hover:bg-card border border-border/50 hover:border-primary/30 text-foreground rounded-xl items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 translate-x-6 hover:translate-x-4 hidden lg:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Clean Slider Container */}
          <div
            id="trainers-slider"
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-2 md:px-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group flex-shrink-0 w-80 snap-start"
              >
                {/* Transparent Outline Card Design */}
                <div className="relative bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden hover:bg-card/80 hover:border-border/50 transition-all duration-500 hover:-translate-y-1 h-[450px] flex flex-col">
                  {/* Transparent Image Container */}
                  <div className="relative h-80 overflow-hidden bg-muted/20 flex-shrink-0">
                    {trainer.image ? (
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className={`w-full h-full object-cover ${trainerPositions[trainer.name] || "object-center"} group-hover:scale-105 transition-all duration-500 ease-out`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center group-hover:scale-105 transition-all duration-500">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 mx-auto border border-primary/15">
                            <Users className="w-8 h-8 text-primary/60" />
                          </div>
                          <p className="text-primary/70 font-medium text-sm">
                            Coming Soon
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Transparent overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent group-hover:from-background/20 transition-all duration-500" />
                  </div>

                  {/* Content Section with transparency */}
                  <div className="p-8 text-center space-y-4 flex-1 flex flex-col justify-center bg-card/40 backdrop-blur-sm">
                    <h3 className="text-2xl font-semibold transition-colors duration-300">
                      <span className="text-foreground">
                        {trainer.name.split(' ')[0]}
                      </span>{' '}
                      <span className="text-primary">
                        {trainer.name.split(' ').slice(1).join(' ')}
                      </span>
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {trainer.title}
                    </p>
                  </div>

                  {/* Transparent accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Clean Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >

        </motion.div>
      </div>
    </section>
  );
}