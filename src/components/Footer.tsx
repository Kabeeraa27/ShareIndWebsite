import Image from "next/image";
import { Mail, Phone, QrCode } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa6";

const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaXTwitter, label: "X" },
];

const KEY_LINKS = [
  "Share India Algos Login",
  "Margin Trading Facility Activation (MTF)",
  "Apply IPO",
  "F&O Activation",
  "Migration",
  "Nominee Addition",
  "Payment Withdrawal",
  "Unpledge Holdings",
  "Approved Collateral List",
  "Downloads",
];

const QUICK_LINKS = [
  "About Us",
  "Footprints",
  "Investor Relations",
  "Fraud Awareness",
  "Privacy Policy",
  "Terms of Use",
  "Disclaimer",
  "Refund Policy",
  "Inquiries",
  "News Room",
  "Blogs",
  "Research",
  "Careers",
  "Employee Corner",
  "Advisory - KYC Compliance",
  "Advisory for Investors",
  "Client's Corner",
  "Investors Corner",
  "Contact Us",
];

const OTHER_LINKS = [
  "Trading Back Office",
  "DP Back Office",
  "MF Back Office",
  "Online KYC Modifications",
  "NSE",
  "BSE",
  "MCX",
  "NCDEX",
  "RBI",
  "CDSL",
  "Algo Trading Platform",
  "SMART ODR",
  "Activate Share India Algos",
  "Client Wise Collateral - BSE",
  "Client Collateral Details - NSE",
  "Client Wise Collateral - MCX",
  "Client Wise Collateral - NCDEX",
  "SID/SAI/KIM",
  "Code of Conduct",
  "Disclosure",
  "Market Maker",
  "SCORES",
  "Investor Awareness – Depository Mobile Applications (CDSL & NSDL)",
  "ODR Circular",
  "SEBI SCORES",
];

function LinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-white/55 hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AttentionList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center">
                <Image
                  src="/logo-mark.png"
                  alt=""
                  width={447}
                  height={409}
                  className="h-full w-full object-contain"
                />
              </span>
              <span
                className="gradient-text text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Share India Institutional Desk
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/55">
              At Share India, we aspire to revolutionize the trading experience through an
              advanced fintech platform — delivering optimal value-for-money trading solutions,
              leveraging the latest in cutting-edge technology.
            </p>

            <h4 className="mt-6 mb-3 text-sm font-semibold text-white">Follow Us</h4>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>

            <h4 className="mt-6 mb-3 text-sm font-semibold text-white">Help Desk</h4>
            <ul className="flex flex-col gap-2 text-sm text-white/55">
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-white/40" aria-hidden="true" />
                <a href="tel:18002030303" className="hover:text-white">
                  Share India Support: 1800 203 0303
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-white/40" aria-hidden="true" />
                <a href="tel:18002030404" className="hover:text-white">
                  Algo Support: 1800 203 0404
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-white/40" aria-hidden="true" />
                <a href="mailto:support@shareindia.com" className="hover:text-white">
                  support@shareindia.com
                </a>
              </li>
            </ul>

            <h4 className="mt-6 mb-3 text-sm font-semibold text-white">Our Apps</h4>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/50">
                <QrCode size={22} aria-hidden="true" />
              </span>
              <a
                href="#"
                className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-white"
              >
                <FaGooglePlay size={13} aria-hidden="true" />
                Google Play
              </a>
              <a
                href="#"
                className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/70 hover:bg-white/5 hover:text-white"
              >
                <FaApple size={14} aria-hidden="true" />
                App Store
              </a>
            </div>
          </div>

          <LinkColumn title="Key Links" links={KEY_LINKS} />
          <LinkColumn title="Quick Links" links={QUICK_LINKS} />
          <LinkColumn title="Other Links" links={OTHER_LINKS} />
        </div>

        <div className="mt-14 border-t border-white/10 pt-10 text-xs leading-relaxed text-white/45">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} www.shareindia.com | All rights reserved.</p>
            <p className="text-white/55">Exciting updates ahead! Get ready for TradingView Powered Charts.</p>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <p>
              Investment in securities market are subject to market risks, read all the related
              documents carefully before investing.
            </p>
            <p>
              Mutual Fund investments are subject to market risks. Please read all scheme related
              documents carefully before investing. Past performance is not an indicator of
              future returns.
            </p>
            <p>
              Registration granted by SEBI and certification from NISM in no way guarantee
              performance of the intermediary or provide any assurance of returns to investors.
            </p>
          </div>

          <h5 className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/70">
            Attention Investors
          </h5>
          <AttentionList
            items={[
              "Stock Brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f. September 1, 2020.",
              "Update your mobile number & email ID with your stock broker/depository participant and receive OTP directly from depository on your email id/mobile number to create pledge.",
              "Pay 20% upfront margin of the transaction value to trade in cash market segment.",
              "Investors may please refer to the Exchange's Frequently Asked Questions (FAQs) issued vide circular reference NSE/INSP/45191 dated July 31, 2020 and NSE/INSP/45534 dated August 31, 2020 and other guidelines issued from time to time in this regard.",
              "Check your Securities / MF / Bonds in the consolidated account statement issued by NSDL/CDSL every month — issued in the interest of Investors.",
            ]}
          />

          <h5 className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/70">
            Precautions for Clients Dealing in Options
          </h5>
          <AttentionList
            items={[
              "Sharing of trading credentials — login id & passwords including OTP's.",
              "Trading in leveraged products like options without proper understanding, which could lead to losses.",
              "Writing / selling options or trading in option strategies based on tips, without basic knowledge & understanding of the product and its risks.",
              "Dealing in unsolicited tips through WhatsApp, Telegram, YouTube, Facebook, SMS, calls, etc.",
              "Trading in \"Options\" based on recommendations from unauthorised / unregistered investment advisors and influencers.",
            ]}
          />

          <p className="mt-6">
            Please note that various non-broking services viz. Insurance, Mutual Funds, IPO,
            NBFC, Merchant Banking etc. offered by Share India group of companies is just acting
            as distribution agent/agent of insurance, Mutual Funds and IPOs. You may please note
            that all disputes with respect to the distribution activity would not have access to
            Exchange investor redressal or Arbitration mechanism.
          </p>

          <p className="mt-4">
            Investors Grievances may be mailed to{" "}
            <a href="mailto:investors@shareindia.com" className="text-white/60 hover:text-white">
              investors@shareindia.com
            </a>
          </p>

          <h5 className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/70">
            Membership Details of Share India Securities Limited
          </h5>
          <p className="mt-2">
            Exchanges Memberships: NSE - 10798, BSE - 0226, MCX - 56190, NCDEX - 1256, MSE - 51200
          </p>
          <p>Depository Participant: CDSL DP ID: 12038000, NSDL DP ID: IN304965</p>

          <h5 className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/70">
            SEBI Registration Nos.
          </h5>
          <p className="mt-2">Share India Securities Ltd</p>
          <p>
            Stock/Commodity: IN200178336, Depository Participant: IN-DP-32-2015, Research
            Analyst: INH000005011, Portfolio Manager Registration No: INP000009427
          </p>
          <p className="mt-2">Share India Capital Services Pvt Ltd</p>
          <p>Merchant Banker: INM000012537</p>

          <h5 className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/70">
            AMFI Registered Mutual Fund Distributor
          </h5>
          <p className="mt-2">
            AMFI Reg No.: ARN-78041 (Date of initial Registration: 26 August 2025; Current
            validity of ARN — 17 November 2028)
          </p>
          <p>
            Compliance Manager — Vardaan Pravesh Verma, Contact No: 0120-4910000, Email id:{" "}
            <a href="mailto:vardaan.verma@shareindia.com" className="text-white/60 hover:text-white">
              vardaan.verma@shareindia.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
