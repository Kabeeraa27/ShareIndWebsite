import Image from "next/image";
import { AlertTriangle, Mail, Phone, ShieldAlert } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const SOCIALS = [
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/people/Share-India/100063991871591/" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/shareindiasecuritieslimited/" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/c/shareindiasecurities" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/company/share-india-securities" },
  { icon: FaXTwitter, label: "X", href: "https://x.com/shareindiasec" },
];

interface FooterLink {
  label: string;
  href: string;
}

// Real destinations live on the main corporate site (shareindia.com), not
// this institutional-desk sub-site, so relative paths from there are
// resolved to absolute shareindia.com URLs here.
const KEY_LINKS: FooterLink[] = [
  { label: "Share India Algos Login", href: "https://login.utradealgos.com/" },
  { label: "Margin Trading Facility Activation (MTF)", href: "https://rekyc.shareindia.com/forms/mtf" },
  { label: "Apply IPO", href: "https://ipo.shareindia.com/ipo" },
  { label: "F&O Activation", href: "https://rekyc.shareindia.com/forms/fno" },
  { label: "Migration", href: "https://rekyc.shareindia.com/forms/migration" },
  { label: "Nominee Addition", href: "https://rekyc.shareindia.com/forms/nominee" },
  { label: "Payment Withdrawal", href: "https://rekyc.shareindia.com/forms/payment-withdrawal" },
  { label: "Unpledge Holdings", href: "https://rekyc.shareindia.com/forms/unpledge/holdings" },
  {
    label: "Approved Collateral List",
    href: "https://docs.google.com/spreadsheets/d/168evSVnYfWKWpCUGFwcWoBjctG6omXtfsH0Mw7T0pnY/edit?gid=0#gid=0",
  },
  { label: "Downloads", href: "https://www.shareindia.com/downloads" },
];

const QUICK_LINKS: FooterLink[] = [
  { label: "About Us", href: "https://www.shareindia.com/about-us" },
  { label: "Footprints", href: "https://www.shareindia.com/about-us/footprints" },
  { label: "Investor Relations", href: "https://www.shareindia.com/about-us/investor-relations" },
  { label: "Fraud Awareness", href: "https://www.shareindia.com/cyber-fraud-alert" },
  { label: "Privacy Policy", href: "https://www.shareindia.com/privacy-policy" },
  { label: "Terms of Use", href: "https://www.shareindia.com/terms-of-use" },
  { label: "Disclaimer", href: "https://www.shareindia.com/disclaimer" },
  { label: "Refund Policy", href: "https://www.shareindia.com/refund-policy" },
  { label: "Inquiries", href: "https://www.shareindia.com/inquiries" },
  { label: "News Room", href: "https://www.shareindia.com/about-us/newsroom" },
  { label: "Blogs", href: "https://www.shareindia.com/knowledge-center" },
  { label: "Research", href: "https://www.shareindia.com/about-us/research" },
  { label: "CDSL E Voting", href: "https://evoting.cdslindia.com/Evoting/EvotingLogin" },
  { label: "Careers", href: "https://www.shareindia.com/about-us/careers" },
  { label: "Employee Corner", href: "https://www.shareindia.com/employee-corner" },
  { label: "Advisory - KYC Compliance", href: "https://www.shareindia.com/advisory-kyc-compliance" },
  { label: "Advisory for Investors", href: "https://www.shareindia.com/advisory-for-investors" },
  { label: "Client's Corner", href: "https://www.shareindia.com/clients-corner" },
  { label: "Investors Corner", href: "https://www.shareindia.com/investor-corner" },
  { label: "Contact Us", href: "https://www.shareindia.com/contact-us" },
];

const OTHER_LINKS: FooterLink[] = [
  { label: "Trading Back Office", href: "https://bo.shareindia.com/CAP/" },
  { label: "DP Back Office", href: "https://bo.shareindia.com/DPCC/" },
  { label: "MF Back Office", href: "https://shareindia.my-portfolio.co.in/app/#/login" },
  { label: "Online KYC Modifications", href: "https://rekyc.shareindia.com/home" },
  { label: "NSE", href: "https://www.nseindia.com/" },
  { label: "BSE", href: "https://www.bseindia.com/" },
  { label: "MCX", href: "https://www.mcxindia.com/" },
  { label: "NCDEX", href: "https://www.ncdex.com/" },
  { label: "RBI", href: "http://www.rbi.org.in/home.aspx" },
  { label: "CDSL", href: "https://www.cdslindia.com/index.html" },
  { label: "Algo Trading Platform", href: "https://login.utradealgos.com/" },
  { label: "SMART ODR", href: "https://smartodr.in/login" },
  { label: "Activate Share India Algos", href: "https://rekyc.shareindia.com/forms/migration-ualgo" },
  { label: "Client Wise Collateral - BSE", href: "https://bseplus.bseindia.com/" },
  {
    label: "Client Collateral Details - NSE",
    href: "https://investorhelpline.nseindia.com/ClientCollateral/welcomeCLUser",
  },
  { label: "Client Wise Collateral - MCX", href: "https://clientreports.mcxccl.com/#/" },
  { label: "Client Wise Collateral - NCDEX", href: "https://ncdex.com/subscriber/login" },
  { label: "SID/SAI/KIM", href: "https://www.sebi.gov.in/filings/mutual-funds.html" },
  {
    label: "Code of Conduct",
    href: "https://www.shareindia.com/wp-content/uploads/2024/06/RevisedCodeofConductforMutualFundDistributors-April2022.pdf",
  },
  {
    label: "Disclosure",
    href: "https://www.shareindia.com/wp-content/uploads/2024/06/MF-Commission-Disclosure.pdf",
  },
  { label: "Market Maker", href: "https://www.shareindia.com/market-maker" },
  { label: "SCORES", href: "https://scores.sebi.gov.in/scores-home" },
  {
    label: "Investor Awareness – Depository Mobile Applications (CDSL & NSDL)",
    href: "https://www.shareindia.com/wp-content/uploads/2026/04/Content-for-Link-for-Header.pdf",
  },
  {
    label: "ODR Circular",
    href: "https://www.shareindia.com/wp-content/uploads/2026/07/Annexue_5_SEBI_Master_Circular_for_Online_Resolution_of_Disputes_December_28_2023.pdf",
  },
  { label: "SEBI SCORES", href: "https://scores.sebi.gov.in/" },
];

function LinkColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-white">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/55 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A titled card for one cluster of legal/compliance content — the goal is
 *  to make a page of dense regulatory text scannable by grouping it into
 *  distinct, bordered blocks instead of one continuous wall of paragraphs. */
function DisclosureCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <h6 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-white/70">
        <Icon size={14} className="shrink-0 text-white/40" aria-hidden />
        {title}
      </h6>
      {children}
    </div>
  );
}

function AttentionList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Compact label/value line used inside the registration-details cards. */
function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-white/70">{label}:</span> {value}
    </p>
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
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <div className="flex items-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.tradingapp.shareindia&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scan to download the Share India app"
                className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5"
              >
                <Image
                  src="/app-qrcode.jpg"
                  alt="QR code to download the Share India app"
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                />
              </a>
              <div className="flex flex-col justify-between" style={{ height: "5rem" }}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.tradingapp.shareindia&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 items-center"
                >
                  <Image
                    src="/playstore-badge.png"
                    alt="Get it on Google Play"
                    width={162}
                    height={48}
                    className="h-full w-auto"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/share-india-demat-stocks-ipo/id1610726788"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 items-center"
                >
                  <Image
                    src="/appstore-badge.png"
                    alt="Download on the App Store"
                    width={162}
                    height={48}
                    className="h-full w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          <LinkColumn title="Key Links" links={KEY_LINKS} />
          <LinkColumn title="Quick Links" links={QUICK_LINKS} />
          <LinkColumn title="Other Links" links={OTHER_LINKS} />
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col justify-between gap-2 text-xs text-white/45 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} www.shareindia.com | All rights reserved.</p>
            <p className="text-white/55">Exciting updates ahead! Get ready for TradingView Powered Charts.</p>
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4 text-xs leading-relaxed text-white/55 sm:p-5">
            <ShieldAlert size={16} className="mt-0.5 shrink-0 text-amber-400/80" aria-hidden />
            <div className="flex flex-col gap-1.5">
              <p>
                Investment in securities market are subject to market risks, read all the related
                documents carefully before investing.
              </p>
              <p>
                Mutual Fund investments are subject to market risks. Please read all scheme related
                documents carefully before investing. Past performance is not an indicator of future
                returns.
              </p>
              <p>
                Registration granted by SEBI and certification from NISM in no way guarantee
                performance of the intermediary or provide any assurance of returns to investors.
              </p>
            </div>
          </div>

                <div className="mt-5 flex flex-col gap-5 text-xs leading-relaxed text-white/45">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <DisclosureCard icon={AlertTriangle} title="Attention Investors">
                      <AttentionList
                        items={[
                          "Stock Brokers can accept securities as margin from clients only by way of pledge in the depository system w.e.f. September 1, 2020.",
                          "Update your mobile number & email ID with your stock broker/depository participant and receive OTP directly from depository on your email id/mobile number to create pledge.",
                          "Pay 20% upfront margin of the transaction value to trade in cash market segment.",
                          "Investors may please refer to the Exchange's Frequently Asked Questions (FAQs) issued vide circular reference NSE/INSP/45191 dated July 31, 2020 and NSE/INSP/45534 dated August 31, 2020 and other guidelines issued from time to time in this regard.",
                          "Check your Securities / MF / Bonds in the consolidated account statement issued by NSDL/CDSL every month — issued in the interest of Investors.",
                        ]}
                      />
                    </DisclosureCard>

                    <DisclosureCard icon={ShieldAlert} title="Precautions for Clients Dealing in Options">
                      <AttentionList
                        items={[
                          "Sharing of trading credentials — login id & passwords including OTP's.",
                          "Trading in leveraged products like options without proper understanding, which could lead to losses.",
                          "Writing / selling options or trading in option strategies based on tips, without basic knowledge & understanding of the product and its risks.",
                          "Dealing in unsolicited tips through WhatsApp, Telegram, YouTube, Facebook, SMS, calls, etc.",
                          "Trading in \"Options\" based on recommendations from unauthorised / unregistered investment advisors and influencers.",
                        ]}
                      />
                    </DisclosureCard>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                    <p>
                      Please note that various non-broking services viz. Insurance, Mutual Funds, IPO,
                      NBFC, Merchant Banking etc. offered by Share India group of companies is just
                      acting as distribution agent/agent of insurance, Mutual Funds and IPOs. You may
                      please note that all disputes with respect to the distribution activity would
                      not have access to Exchange investor redressal or Arbitration mechanism.
                    </p>
                    <p className="mt-3">
                      Investors Grievances may be mailed to{" "}
                      <a href="mailto:investors@shareindia.com" className="text-white/65 hover:text-white">
                        investors@shareindia.com
                      </a>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <DisclosureCard icon={ShieldAlert} title="Membership Details">
                      <div className="flex flex-col gap-1">
                        <InfoLine
                          label="Exchanges"
                          value="NSE - 10798, BSE - 0226, MCX - 56190, NCDEX - 1256, MSE - 51200"
                        />
                        <InfoLine label="Depository Participant" value="CDSL DP ID: 12038000, NSDL DP ID: IN304965" />
                      </div>
                    </DisclosureCard>

                    <DisclosureCard icon={ShieldAlert} title="SEBI Registration Nos.">
                      <div className="flex flex-col gap-1">
                        <p className="text-white/60">Share India Securities Ltd</p>
                        <InfoLine label="Stock/Commodity" value="IN200178336" />
                        <InfoLine label="Depository Participant" value="IN-DP-32-2015" />
                        <InfoLine label="Research Analyst" value="INH000005011" />
                        <InfoLine label="Portfolio Manager Reg. No" value="INP000009427" />
                        <p className="mt-2 text-white/60">Share India Capital Services Pvt Ltd</p>
                        <InfoLine label="Merchant Banker" value="INM000012537" />
                      </div>
                    </DisclosureCard>

                    <DisclosureCard icon={ShieldAlert} title="AMFI Registered MF Distributor">
                      <div className="flex flex-col gap-1">
                        <InfoLine label="AMFI Reg No" value="ARN-78041" />
                        <p>Registered 26 Aug 2025 · Valid to 17 Nov 2028</p>
                        <p className="mt-2 text-white/60">Compliance Manager</p>
                        <p>Vardaan Pravesh Verma · 0120-4910000</p>
                        <a
                          href="mailto:vardaan.verma@shareindia.com"
                          className="text-white/65 hover:text-white"
                        >
                          vardaan.verma@shareindia.com
                        </a>
                      </div>
                    </DisclosureCard>
                  </div>
                </div>
        </div>
      </div>
    </footer>
  );
}
