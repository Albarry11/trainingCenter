import {
  MapPin,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  ExternalLink,
  Copy,
  Phone,
  Building,
} from "lucide-react";
import { TikTokIcon } from './TikTokIcon';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { toast } from "sonner";

export function Contact() {
  const copyEmailToClipboard = async () => {
    const email = "swaragamatrainingcenter@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email berhasil disalin!", {
        description:
          "Alamat email telah disalin ke clipboard Anda.",
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Email berhasil disalin!", {
        description:
          "Alamat email telah disalin ke clipboard Anda.",
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Kunjungi Kami",
      details: [
        "Swaragama Training Center Office",
        "Bulaksumur Blok G, Sagan, Caturtunggal, Depok, Sleman, DI Yogyakarta",
      ],
      link: "https://maps.app.goo.gl/kAQMhZLm6M2kCYXz8",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Kami",
      details: ["+62 856 2727 323", "Chat langsung"],
      link: "https://wa.me/628562727323",
    },
    {
      icon: Mail,
      title: "Email Kami",
      details: ["swaragamatrainingcenter@gmail.com"],
      link: "mailto:swaragamatrainingcenter@gmail.com",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      details: [
        "Senin s/d Jumat pukul 09.00-17.00 WIB",
        "Sabtu minggu tutup",
      ],
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: ExternalLink,
      href: "https://linktr.ee/swaragamatrainingcenter?fbclid=PAZXh0bgNhZW0CMTEAAacup0DxNzB564WQu9HRJnDWvDuHNiAPQJOf5Sa2_fn4M3ixduFZE3x9-Gcw8g_aem_DVWpZlZUnuxm9bsqjiRw8w",
      label: "Linktree",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/swaragamatc/",
      label: "Instagram",
    },
    {
      icon: TikTokIcon,
      href: "https://www.tiktok.com/@swaragamatc?_t=zs-8zh6aqnpwt6&_r=1",
      label: "TikTok",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/628562727323",
      label: "WhatsApp",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Kontak & Lokasi
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-primary to-yellow-600 bg-clip-text text-transparent">
              Hubungi Kami
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hubungi kami untuk mendiskusikan kebutuhan pelatihan
            Anda
          </p>
        </motion.div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;

            const CardComponent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="h-full"
              >
                <Card className="hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-transparent group bg-card h-full relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardContent className="p-6 text-center relative z-10 h-full flex flex-col">
                    {/* Enhanced Icon */}
                    <div className="relative mb-4">
                      <div className="bg-gradient-to-br from-accent to-accent/50 w-18 h-18 rounded-2xl flex items-center justify-center mx-auto group-hover:from-primary group-hover:to-primary/80 transition-all duration-500 group-hover:scale-110 shadow-lg">
                        <IconComponent className="w-9 h-9 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                      </div>
                      {/* Decorative ring */}
                      <div className="absolute inset-0 w-18 h-18 mx-auto rounded-2xl border-2 border-transparent group-hover:border-transparent transition-colors duration-500 animate-pulse" />
                    </div>

                    {/* Enhanced Title */}
                    <h4 className="text-lg font-bold bg-gradient-to-r from-card-foreground to-card-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-500 mb-4">
                      {info.title}
                    </h4>

                    {/* Enhanced Details - flexible grow area */}
                    <div className="space-y-3 flex-grow">
                      {info.details.map(
                        (detail, detailIndex) => {
                          // Special formatting for different types of details
                          let formattedDetail = detail;
                          let additionalClasses =
                            "text-muted-foreground text-sm leading-relaxed transition-colors duration-300 group-hover:text-foreground";

                          // Phone number formatting
                          if (
                            detail.includes("+62") ||
                            detail.includes("Chat")
                          ) {
                            additionalClasses += " font-medium";
                            if (detail.includes("+62")) {
                              formattedDetail = detail.replace(
                                "+62",
                                "+62 ",
                              );
                            }
                          }

                          // Email formatting
                          if (detail.includes("@")) {
                            additionalClasses +=
                              " font-mono text-xs bg-muted/50 rounded-md px-2 py-1";
                          }

                          // Time formatting
                          if (
                            detail.includes(":") &&
                            (detail.includes("WIB") ||
                              detail.includes("Tutup"))
                          ) {
                            additionalClasses += " font-medium";
                            if (detail.includes("Tutup")) {
                              additionalClasses +=
                                " text-red-500";
                            }
                          }

                          // Weekend closure formatting
                          if (
                            detail.includes("tutup") &&
                            !detail.includes(":")
                          ) {
                            additionalClasses +=
                              " font-medium text-red-500";
                          }

                          // Address formatting
                          if (
                            detailIndex === 0 &&
                            info.title === "Kunjungi Kami"
                          ) {
                            additionalClasses +=
                              " font-semibold text-primary";
                          }
                          if (
                            detailIndex >= 1 &&
                            info.title === "Kunjungi Kami"
                          ) {
                            additionalClasses += " text-left";
                          }

                          return (
                            <p
                              key={detailIndex}
                              className={additionalClasses}
                            >
                              {formattedDetail}
                            </p>
                          );
                        },
                      )}
                    </div>

                    {/* Action Indicator - positioned at bottom */}
                    {(info.link ||
                      info.title === "Email Kami") && (
                      <div className="mt-auto pt-4">
                        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          {info.title === "Email Kami" ? (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Klik untuk salin</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-3 h-3" />
                              <span>Klik untuk buka</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );

            // Special handling for email card
            if (info.title === "Email Kami") {
              return (
                <div
                  key={index}
                  onClick={copyEmailToClipboard}
                  className="block cursor-pointer"
                >
                  {CardComponent}
                </div>
              );
            }

            // If the info has a link, wrap the entire card with an anchor tag
            if (info.link) {
              return (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  {CardComponent}
                </a>
              );
            }

            // If no link, render the card normally
            return <div key={index}>{CardComponent}</div>;
          })}
        </div>

        {/* Bottom Section - Map and Social Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-2 border-transparent hover:border-transparent transition-all duration-500 bg-card hover:shadow-xl group">
              <CardContent className="p-0">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.134110271651!2d110.3740114743059!3d-7.775601177138395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59c8ef13c217%3A0x1f0f046a12e1e8bd!2sWisma%20Kagama!5e0!3m2!1sen!2sid!4v1757864975597!5m2!1sen!2sid"
                    className="absolute inset-0 w-full h-full border-0 rounded-lg transition-all duration-300 hover:brightness-110"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Swaragama Training Center - Wisma Kagama"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-transparent hover:border-transparent transition-all duration-500 bg-card hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-card-foreground to-primary bg-clip-text text-transparent">
                  Ikuti Kami
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Terhubung dengan kami
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group"
                      >
                        <div className="bg-gradient-to-br from-accent to-accent/50 w-14 h-14 rounded-2xl flex items-center justify-center hover:from-primary hover:to-primary/80 transition-all duration-300 shadow-lg">
                          <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          {social.label}
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Enhanced description */}
                <div className="text-center space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="text-[rgba(0,0,0,1)] dark:text-white font-medium">
                      {" "}
                      Linktree | Instagram | TikTok | WhatsApp
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}