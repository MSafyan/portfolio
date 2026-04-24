import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { resumeData, experiences, projects, certifications } from "../constants";

// ─── Utility ──────────────────────────────────────────────────────────────────

const Tag = ({ children, color = "#c05621" }) => (
  <span style={{
    background: color, color: "#fff", padding: "2px 10px",
    borderRadius: 999, fontSize: 12, fontWeight: 700,
    display: "inline-block", margin: "2px",
  }}>
    {children}
  </span>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "#fef9f0", borderRadius: 12, padding: 16,
    border: "1px solid #e8d5b0", marginBottom: 14,
    ...style,
  }}>
    {children}
  </div>
);

// ─── Panel Content ────────────────────────────────────────────────────────────

const AboutPanel = () => (
  <div>
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div style={{
        width: 76, height: 76, borderRadius: "50%",
        background: "linear-gradient(135deg,#e8a87c,#c05621)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 30, margin: "0 auto 12px",
        border: "3px solid #c05621",
        boxShadow: "0 4px 12px rgba(192,86,33,0.3)",
      }}>
        👨‍💻
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 900, color: "#3d2b1f", margin: "0 0 4px" }}>
        {resumeData.name}
      </h3>
      <p style={{ color: "#c05621", fontWeight: 700, margin: 0, fontSize: 14 }}>
        {resumeData.title}
      </p>
    </div>

    <Card>
      <p style={{ color: "#5d4037", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
        {resumeData.summary}
      </p>
    </Card>

    <h4 style={{ color: "#7b4f2e", fontWeight: 800, marginBottom: 8, fontSize: 14 }}>
      🎓 Education
    </h4>
    <Card>
      <p style={{ fontWeight: 800, color: "#3d2b1f", margin: "0 0 4px", fontSize: 14 }}>
        {resumeData.education.degree}
      </p>
      <p style={{ color: "#7b4f2e", fontSize: 13, margin: "0 0 2px" }}>
        {resumeData.education.school}
      </p>
      <p style={{ color: "#a08060", fontSize: 12, margin: 0 }}>
        Class of {resumeData.education.graduationYear}
      </p>
    </Card>
  </div>
);

const ExperiencePanel = () => (
  <div>
    {experiences.map((exp, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.07 }}
      >
        <Card style={{ borderLeft: "4px solid #c05621" }}>
          <p style={{ fontWeight: 900, color: "#3d2b1f", margin: "0 0 2px", fontSize: 14 }}>
            {exp.title}
          </p>
          <p style={{ color: "#c05621", fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>
            {exp.company_name}
          </p>
          <p style={{ color: "#a08060", fontSize: 12, margin: "0 0 10px" }}>📅 {exp.date}</p>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {exp.points.slice(0, 2).map((pt, j) => (
              <li key={j} style={{ color: "#5d4037", fontSize: 12, lineHeight: 1.7, marginBottom: 4 }}>
                {pt}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    ))}
  </div>
);

const ProjectsPanel = () => (
  <div>
    {projects.slice(0, 7).map((proj, i) => (
      <motion.div
        key={proj.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.06 }}
      >
        <Card>
          <p style={{ fontWeight: 900, color: "#3d2b1f", margin: "0 0 6px", fontSize: 14 }}>
            {proj.name}
          </p>
          <p style={{ color: "#5d4037", fontSize: 12, lineHeight: 1.65, margin: "0 0 8px" }}>
            {proj.description.length > 130
              ? proj.description.slice(0, 130) + "…"
              : proj.description}
          </p>
          <div style={{ marginBottom: 6 }}>
            {proj.tags.slice(0, 3).map(tag => (
              <Tag key={tag.name}>{tag.name}</Tag>
            ))}
          </div>
          {proj.source_code_link && proj.source_code_link !== "#" && (
            <a href={proj.source_code_link} target="_blank" rel="noopener noreferrer"
              style={{ color: "#c05621", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
              🔗 View Project →
            </a>
          )}
        </Card>
      </motion.div>
    ))}
  </div>
);

const SkillsPanel = () => {
  const COLORS = ["#c05621","#2d6a4f","#1565c0","#6a1565","#795548","#b71c1c","#37474f"];
  const parsed = resumeData.skills.map((skill, i) => {
    const idx = skill.indexOf(":");
    const category = skill.substring(0, idx);
    const items = skill.substring(idx + 2).split(" | ").map(s => s.split(" ")[0]);
    return { category, items, color: COLORS[i % COLORS.length] };
  });

  return (
    <div>
      {parsed.map(({ category, items, color }, i) => (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
          <Card>
            <p style={{ fontWeight: 800, color: "#3d2b1f", margin: "0 0 8px", fontSize: 13 }}>
              {category}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              {items.slice(0, 8).map((item, j) => (
                <Tag key={j} color={color}>{item}</Tag>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const ContactPanel = () => (
  <div>
    <p style={{ color: "#5d4037", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>
      Ready to collaborate? Reach out through any of these channels! 🚀
    </p>
    {[
      { icon: "💼", label: "LinkedIn", sub: "Connect professionally", href: "https://www.linkedin.com/in/safyan-akram/", color: "#0077b5" },
      { icon: "🐙", label: "GitHub", sub: "View my code", href: "https://github.com/MSafyan", color: "#333" },
      { icon: "⬆️", label: "Upwork", sub: "Hire me for freelance", href: "https://www.upwork.com/freelancers/~0110ed1cc027d85e0f", color: "#6fda44" },
      { icon: "🟢", label: "Fiverr", sub: "Order a gig", href: "https://www.fiverr.com/s/P216loL", color: "#1dbf73" },
    ].map((link, i) => (
      <motion.a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "14px 16px", background: "#fef9f0",
          borderRadius: 12, border: `2px solid ${link.color}`,
          marginBottom: 12, textDecoration: "none", color: "#3d2b1f",
          fontWeight: 700, fontSize: 15,
        }}
        whileHover={{ scale: 1.02, x: 4 }}
      >
        <span style={{ fontSize: 22 }}>{link.icon}</span>
        <div>
          <div>{link.label}</div>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#a08060" }}>{link.sub}</div>
        </div>
        <span style={{ marginLeft: "auto", color: link.color, fontSize: 18 }}>→</span>
      </motion.a>
    ))}
  </div>
);

const CertificationsPanel = () => (
  <div>
    {certifications.map((cert, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.08 }}
      >
        <Card style={{ border: "2px solid #c05621" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>🏅</span>
            <div>
              <p style={{ fontWeight: 800, color: "#3d2b1f", margin: "0 0 2px", fontSize: 13 }}>
                {cert.name}
              </p>
              <p style={{ color: "#7b4f2e", fontSize: 12, margin: "0 0 2px" }}>
                {cert.provider}
              </p>
              <p style={{ color: "#a08060", fontSize: 11, margin: "0 0 6px" }}>📅 {cert.date}</p>
              {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#c05621", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                  View Certificate →
                </a>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    ))}
  </div>
);

// ─── SVG Building Components ──────────────────────────────────────────────────

const ToriiGate = ({ isActive }) => (
  <g>
    {isActive && <circle r={55} fill="#ffd700" opacity={0.15} />}
    {/* Pillars */}
    <rect x={-26} y={-105} width={13} height={115} fill="#c0392b" rx={3} />
    <rect x={13} y={-105} width={13} height={115} fill="#c0392b" rx={3} />
    {/* Kasagi (top curved beam) */}
    <path d="M-38,-98 C-10,-118 10,-118 38,-98 L38,-84 C10,-104 -10,-104 -38,-84 Z" fill="#a93226" />
    {/* Nuki (second beam) */}
    <rect x={-29} y={-78} width={58} height={9} fill="#c0392b" rx={2} />
    {/* Shimewaza rope */}
    <path d="M-26,-88 Q0,-80 26,-88" stroke="#f5deb3" strokeWidth={2.5} fill="none" strokeDasharray="3,4" />
    {/* Shide (paper zigzags) */}
    <path d="M-4,-90 L-8,-70 L-2,-70 L-6,-60 L0,-60" stroke="white" strokeWidth={1.5} fill="none" opacity={0.9} />
    <path d="M4,-90 L8,-70 L2,-70 L6,-60 L0,-60" stroke="white" strokeWidth={1.5} fill="none" opacity={0.9} />
    {isActive && (
      <motion.circle r={45} fill="none" stroke="#ffd700" strokeWidth={2.5}
        animate={{ r: [40, 58, 40], opacity: [0.7, 0, 0.7] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      />
    )}
  </g>
);

const RamenShop = ({ isActive }) => (
  <g>
    {isActive && <circle r={62} fill="#e74c3c" opacity={0.12} />}
    {/* Base */}
    <rect x={-40} y={-55} width={80} height={68} fill="#c0392b" rx={4} />
    {/* Roof */}
    <polygon points="-50,-55 50,-55 36,-92 -36,-92" fill="#922b21" />
    <rect x={-36} y={-97} width={72} height={12} fill="#7b241c" rx={2} />
    {/* Door */}
    <rect x={-13} y={-22} width={26} height={35} fill="#f5cba7" rx={3} />
    <line x1={0} y1={-22} x2={0} y2={13} stroke="#c0392b" strokeWidth={2} />
    {/* Windows */}
    <rect x={-34} y={-42} width={17} height={14} fill="#aed6f1" rx={2} />
    <rect x={17} y={-42} width={17} height={14} fill="#aed6f1" rx={2} />
    {/* Lanterns */}
    <ellipse cx={-26} cy={-70} rx={7} ry={10} fill="#e74c3c" />
    <ellipse cx={26} cy={-70} rx={7} ry={10} fill="#e74c3c" />
    <line x1={-26} y1={-60} x2={-26} y2={-53} stroke="#922b21" strokeWidth={1.5} />
    <line x1={26} y1={-60} x2={26} y2={-53} stroke="#922b21" strokeWidth={1.5} />
    {/* Sign */}
    <rect x={-20} y={-88} width={40} height={14} fill="#f9e79f" rx={3} />
    <text x={0} y={-78} textAnchor="middle" fontSize={9} fill="#922b21" fontFamily="serif">ラーメン</text>
    {/* Steam puffs */}
    {[-12, 0, 12].map((ox, i) => (
      <motion.circle key={i} cx={ox} cy={-62} r={4} fill="white" opacity={0}
        animate={{ cy: [-62, -82], opacity: [0, 0.55, 0], r: [3, 6] }}
        transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.7, ease: "easeOut" }}
      />
    ))}
    {isActive && (
      <motion.circle r={50} fill="none" stroke="#e74c3c" strokeWidth={2}
        animate={{ r: [46, 62, 46], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      />
    )}
  </g>
);

const TeaHouse = ({ isActive }) => (
  <g>
    {isActive && <circle r={68} fill="#27ae60" opacity={0.12} />}
    {/* Base */}
    <rect x={-44} y={-62} width={88} height={75} fill="#5d4e2e" rx={4} />
    {/* Upper roof */}
    <polygon points="-54,-62 54,-62 38,-96 -38,-96" fill="#2d6a4f" />
    {/* Roof cap */}
    <rect x={-38} y={-102} width={76} height={13} fill="#1a4a35" rx={3} />
    {/* Roof finial */}
    <polygon points="-5,-115 5,-115 0,-102" fill="#c0392b" />
    {/* Shoji door */}
    <rect x={-16} y={-30} width={32} height={43} fill="#f5f5dc" rx={2} />
    <line x1={0} y1={-30} x2={0} y2={13} stroke="#8b6914" strokeWidth={1.5} />
    <line x1={-16} y1={-12} x2={16} y2={-12} stroke="#8b6914" strokeWidth={1} />
    {/* Windows */}
    <rect x={-39} y={-50} width={19} height={16} fill="#f5f5dc" rx={2} />
    <rect x={20} y={-50} width={19} height={16} fill="#f5f5dc" rx={2} />
    {/* Tea sign */}
    <rect x={-15} y={-96} width={30} height={18} fill="#c0392b" rx={2} />
    <text x={0} y={-83} textAnchor="middle" fontSize={14} fill="white" fontFamily="serif">茶</text>
    {/* Hanging lantern */}
    <line x1={0} y1={-84} x2={0} y2={-74} stroke="#8b6914" strokeWidth={1.5} />
    <ellipse cx={0} cy={-68} rx={8} ry={11} fill="#f39c12" />
    <text x={0} y={-65} textAnchor="middle" fontSize={7} fill="white">茶</text>
    {isActive && (
      <motion.circle r={55} fill="none" stroke="#27ae60" strokeWidth={2}
        animate={{ r: [50, 68, 50], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      />
    )}
  </g>
);

const Bakery = ({ isActive }) => (
  <g>
    {isActive && <circle r={62} fill="#f39c12" opacity={0.12} />}
    {/* Roof */}
    <polygon points="-52,-58 52,-58 36,-88 -36,-88" fill="#e67e22" />
    <rect x={-36} y={-94} width={72} height={12} fill="#d35400" rx={2} />
    {/* Awning */}
    <path d="M-50,-34 C0,-18 0,-18 50,-34 L50,-52 C0,-36 0,-36 -50,-52 Z" fill="#f39c12" />
    {[-32,-16,0,16,32].map((x,i)=>(
      <line key={i} x1={x} y1={-52} x2={x} y2={-20} stroke="#e67e22" strokeWidth={2.5} opacity={0.7}/>
    ))}
    {/* Wall */}
    <rect x={-44} y={-34} width={88} height={47} fill="#fdebd0" rx={2} />
    {/* Display windows */}
    <rect x={-40} y={-28} width={24} height={20} fill="#aed6f1" rx={2} />
    <rect x={16} y={-28} width={24} height={20} fill="#aed6f1" rx={2} />
    <text x={-28} y={-14} textAnchor="middle" fontSize={13}>🍞</text>
    <text x={28} y={-14} textAnchor="middle" fontSize={13}>🥐</text>
    {/* Door */}
    <rect x={-12} y={-18} width={24} height={31} fill="#d35400" rx={3} />
    <circle cx={9} cy={-4} r={2} fill="#f39c12" />
    {/* Sign */}
    <rect x={-24} y={-86} width={48} height={14} fill="white" rx={2} />
    <text x={0} y={-76} textAnchor="middle" fontSize={9} fill="#d35400" fontWeight="bold">BAKERY</text>
    {isActive && (
      <motion.circle r={52} fill="none" stroke="#f39c12" strokeWidth={2}
        animate={{ r: [48, 63, 48], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.7 }}
      />
    )}
  </g>
);

const Library = ({ isActive }) => (
  <g>
    {isActive && <circle r={62} fill="#2980b9" opacity={0.12} />}
    {/* Building */}
    <rect x={-40} y={-100} width={80} height={113} fill="#34495e" rx={3} />
    {/* Roof */}
    <polygon points="-44,-100 44,-100 30,-126 -30,-126" fill="#2c3e50" />
    <rect x={-30} y={-132} width={60} height={12} fill="#1a252f" rx={2} />
    {/* Floor divider */}
    <rect x={-40} y={-50} width={80} height={5} fill="#2c3e50" />
    {/* Windows top */}
    {[-25,-6,13].map((x,i) => (
      <rect key={i} x={x} y={-90} width={14} height={22} fill="#a8d6f8" rx={2} />
    ))}
    {/* Windows bottom */}
    {[-28,14].map((x,i) => (
      <rect key={i} x={x} y={-40} width={17} height={22} fill="#a8d6f8" rx={2} />
    ))}
    {/* Door */}
    <rect x={-10} y={-18} width={20} height={31} fill="#795548" rx={2} />
    <circle cx={7} cy={-4} r={2} fill="#a07820" />
    {/* Sign */}
    <rect x={-26} y={-128} width={52} height={14} fill="#1565c0" rx={2} />
    <text x={0} y={-118} textAnchor="middle" fontSize={9} fill="white" fontWeight="bold">LIBRARY</text>
    {/* Book spines in window */}
    {[["#e74c3c","#f39c12","#27ae60","#9b59b6"]].map((colors) =>
      colors.map((c, i) => (
        <rect key={i} x={-24+i*4} y={-86} width={3} height={18} fill={c} rx={1} />
      ))
    )}
    {isActive && (
      <motion.circle r={53} fill="none" stroke="#2980b9" strokeWidth={2}
        animate={{ r: [49, 64, 49], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.7 }}
      />
    )}
  </g>
);

const PostOffice = ({ isActive }) => (
  <g>
    {isActive && <circle r={57} fill="#c0392b" opacity={0.12} />}
    {/* Base */}
    <rect x={-40} y={-58} width={80} height={71} fill="#ecf0f1" rx={3} />
    {/* Roof */}
    <polygon points="-46,-58 46,-58 32,-88 -32,-88" fill="#c0392b" />
    <rect x={-32} y={-94} width={64} height={12} fill="#922b21" rx={2} />
    {/* Door */}
    <rect x={-13} y={-24} width={26} height={37} fill="#c0392b" rx={2} />
    <circle cx={10} cy={-6} r={2.5} fill="#f0f0f0" />
    {/* Windows */}
    <rect x={-35} y={-46} width={18} height={16} fill="#aed6f1" rx={2} />
    <rect x={17} y={-46} width={18} height={16} fill="#aed6f1" rx={2} />
    {/* Postal mark sign */}
    <rect x={-18} y={-90} width={36} height={18} fill="white" rx={3} />
    <text x={0} y={-77} textAnchor="middle" fontSize={14} fill="#c0392b" fontWeight="bold">〒</text>
    {/* Mailbox outside */}
    <rect x={32} y={-16} width={18} height={26} fill="#c0392b" rx={3} />
    <rect x={32} y={-16} width={18} height={7} fill="#922b21" rx={3} />
    <rect x={35} y={-12} width={12} height={2.5} fill="white" rx={1} />
    {/* Flag */}
    <rect x={48} y={-34} width={2.5} height={24} fill="#7f8c8d" />
    <polygon points="50.5,-34 63,-29 50.5,-24" fill="#c0392b" />
    {isActive && (
      <motion.circle r={48} fill="none" stroke="#c0392b" strokeWidth={2}
        animate={{ r: [44, 58, 44], opacity: [0.6, 0, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      />
    )}
  </g>
);

// ─── Map Config ───────────────────────────────────────────────────────────────

const LOCATIONS = [
  { id: "certifications", label: "Certifications", name: "Torii Gate", emoji: "⛩️",  sx: 600, sy: 158, Component: ToriiGate },
  { id: "experience",     label: "Experience",     name: "Ramen Shop", emoji: "🍜",  sx: 228, sy: 305, Component: RamenShop },
  { id: "about",          label: "About Me",       name: "Tea House",  emoji: "🍵",  sx: 555, sy: 395, Component: TeaHouse },
  { id: "projects",       label: "Projects",       name: "Bakery",     emoji: "🍰",  sx: 878, sy: 278, Component: Bakery },
  { id: "skills",         label: "Skills",         name: "Library",    emoji: "📚",  sx: 193, sy: 528, Component: Library },
  { id: "contact",        label: "Contact",        name: "Post Office",emoji: "📮",  sx: 888, sy: 502, Component: PostOffice },
];

const PANELS = {
  about: AboutPanel,
  experience: ExperiencePanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  contact: ContactPanel,
  certifications: CertificationsPanel,
};

// Stable petal data (generated once, not in render)
const PETALS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  sx: (i * 79) % 1200,
  drift: 60 + (i * 37) % 120,
  size: 4 + (i * 13) % 6,
  delay: (i * 1.3) % 10,
  dur: 10 + (i * 7) % 8,
}));

const TREES = [
  [92,228],[162,248],[385,205],[445,175],[712,218],[765,182],
  [1025,205],[1085,186],[112,475],[382,485],[722,468],[1025,448],
  [352,624],[562,636],[782,620],[452,358],[672,338],
];

const FLOWERS = [
  [338,494],[418,524],[498,558],[642,548],[752,568],
  [852,544],[302,614],[662,614],[520,590],
];

// ─── Main Component ───────────────────────────────────────────────────────────

// ─── Main Component ───────────────────────────────────────────────────────────

const UNUSED = (
  <div style={{
    minHeight: "100vh", background: "#f0d9a0",
    fontFamily: "'Nunito','Poppins',sans-serif",
  }}>
    {/* Header */}
    <div style={{
      position: "sticky", top: 0, zIndex: 30,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px",
      background: "rgba(240,217,160,0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "2px solid rgba(192,86,33,0.28)",
    }}>
      <Link to="/" style={{
        color: "#7b4f2e", fontWeight: 800, textDecoration: "none", fontSize: 12,
        padding: "5px 12px", borderRadius: 20, border: "2px solid #c05621",
        background: "rgba(255,255,255,0.7)",
      }}>← Back</Link>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "#3d2b1f" }}>
          🗺️ Safyan's Village
        </h1>
        <p style={{ margin: 0, fontSize: 10, color: "#7b4f2e", fontWeight: 700 }}>
          Full-Stack &amp; Cloud Engineer
        </p>
      </div>
      <div style={{ width: 60 }} />
    </div>

    {/* Decorative banner */}
    <div style={{
      background: "linear-gradient(135deg,#c05621,#e67e22)",
      padding: "18px 20px", textAlign: "center",
    }}>
      <p style={{ margin: 0, color: "white", fontWeight: 800, fontSize: 15 }}>
        🌸 Tap any location to explore
      </p>
      <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.82)", fontSize: 12 }}>
        6 destinations · Interactive village
      </p>
    </div>

    {/* Location cards grid */}
    <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {LOCATIONS.map((l, i) => {
        const colors = LOCATION_COLORS[l.id] || { bg: "#c05621", light: "#fff3e0" };
        return (
          <motion.div key={l.id}
            onClick={() => toggle(l.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: colors.light,
              borderRadius: 16,
              padding: "18px 12px",
              border: `2px solid ${colors.bg}`,
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 8 }}>{l.emoji}</div>
            <p style={{ margin: "0 0 4px", fontWeight: 900, color: "#3d2b1f", fontSize: 14 }}>
              {l.label}
            </p>
            <p style={{ margin: 0, color: colors.bg, fontSize: 11, fontWeight: 700 }}>
              {l.name}
            </p>
          </motion.div>
        );
      })}
    </div>

    {/* Cherry blossom decoration */}
    <div style={{ textAlign: "center", padding: "8px 0 24px", color: "#c05621", fontSize: 22 }}>
      🌸 🍃 🌸
    </div>

    {/* Bottom sheet overlay */}
    <AnimatePresence>
      {active && loc && Panel && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => toggle(active)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(61,43,31,0.45)",
              zIndex: 40,
            }}
          />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0,
              height: "85vh", background: "#fffbf2",
              borderRadius: "20px 20px 0 0",
              zIndex: 50, display: "flex", flexDirection: "column",
              boxShadow: "0 -8px 32px rgba(61,43,31,0.22)",
            }}
          >
            {/* Drag handle */}
            <div style={{ padding: "12px 0 0", display: "flex", justifyContent: "center" }}>
              <div style={{
                width: 44, height: 5, background: "#c05621",
                borderRadius: 3, opacity: 0.4,
              }} />
            </div>

            {/* Sheet header */}
            <div style={{
              background: "linear-gradient(135deg,#c05621,#e67e22)",
              padding: "14px 20px 16px", flexShrink: 0,
            }}>
              <button onClick={() => toggle(active)} style={{
                background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.4)",
                color: "white", padding: "4px 14px", borderRadius: 20,
                cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 10,
                display: "block", fontFamily: "inherit",
              }}>
                ✕ Close
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 28 }}>{loc.emoji}</span>
                <div>
                  <h2 style={{ color: "white", margin: 0, fontSize: 20, fontWeight: 900 }}>
                    {loc.label}
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.82)", margin: 0, fontSize: 12, fontWeight: 600 }}>
                    📍 {loc.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Sheet content */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "16px",
              scrollbarWidth: "thin", scrollbarColor: "#c05621 #f5e6c8",
            }}>
              <Panel />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const MapPortfolio = () => {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const loc = LOCATIONS.find(l => l.id === active);
  const Panel = active ? PANELS[active] : null;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggle = (id) => setActive(prev => prev === id ? null : id);

  if (isMobile) {
    return <MobileLayout active={active} toggle={toggle} loc={loc} Panel={Panel} />;
  }

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden", position: "relative",
      fontFamily: "'Nunito','Poppins',sans-serif", background: "#f0d9a0",
    }}>

      {/* ── Header ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px",
        background: "rgba(240,217,160,0.88)",
        backdropFilter: "blur(10px)",
        borderBottom: "2px solid rgba(192,86,33,0.28)",
      }}>
        <Link to="/" style={{
          color: "#7b4f2e", fontWeight: 800, textDecoration: "none", fontSize: 13,
          padding: "6px 16px", borderRadius: 20, border: "2px solid #c05621",
          background: "rgba(255,255,255,0.65)",
        }}>
          ← Portfolio
        </Link>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#3d2b1f", letterSpacing: 0.5 }}>
            🗺️ Safyan's Village
          </h1>
          <p style={{ margin: 0, fontSize: 11, color: "#7b4f2e", fontWeight: 700 }}>
            Full-Stack &amp; Cloud Engineer
          </p>
        </div>
        <div style={{
          color: "#7b4f2e", fontSize: 12, fontWeight: 700,
          background: "rgba(255,255,255,0.65)", padding: "6px 14px",
          borderRadius: 20, border: "1px solid rgba(192,86,33,0.3)",
        }}>
          ✨ Tap a location
        </div>
      </div>

      {/* ── SVG World Map ── */}
      <svg viewBox="0 0 1200 700" style={{ width: "100%", height: "100%", display: "block" }}
        preserveAspectRatio="xMidYMid slice">

        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4fa8d5" />
            <stop offset="100%" stopColor="#7ec8e3" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="3" stdDeviation="4" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Ground */}
        <rect width={1200} height={700} fill="#f0d9a0" />

        {/* Water */}
        <path d="M0,0 L1200,0 L1200,198 Q900,178 600,192 Q300,206 0,182 Z" fill="url(#waterGrad)" />

        {/* Animated water shimmer */}
        {[100, 145].map((y, i) => (
          <motion.path key={i}
            d={`M40,${y} Q300,${y-14} 600,${y+8} Q900,${y+20} 1160,${y}`}
            stroke="white" strokeWidth={i === 0 ? 2 : 1.5} fill="none" opacity={i === 0 ? 0.3 : 0.2}
            animate={{ d: [
              `M40,${y} Q300,${y-14} 600,${y+8} Q900,${y+20} 1160,${y}`,
              `M40,${y+12} Q300,${y-2} 600,${y-4} Q900,${y+8} 1160,${y+14}`,
              `M40,${y} Q300,${y-14} 600,${y+8} Q900,${y+20} 1160,${y}`,
            ]}}
            transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Shore */}
        <path d="M0,182 Q300,206 600,192 Q900,178 1200,198 L1200,216 Q900,200 600,214 Q300,228 0,204 Z"
          fill="#d4a76a" opacity={0.55} />

        {/* Grass patches */}
        <ellipse cx={200} cy={590} rx={290} ry={145} fill="#8dc26f" opacity={0.65} />
        <ellipse cx={985} cy={578} rx={270} ry={135} fill="#8dc26f" opacity={0.65} />
        <ellipse cx={555} cy={412} rx={185} ry={105} fill="#a8d48c" opacity={0.48} />
        <ellipse cx={228} cy={318} rx={125} ry={85} fill="#a8d48c" opacity={0.38} />
        <ellipse cx={875} cy={288} rx={135} ry={95} fill="#a8d48c" opacity={0.38} />

        {/* Dirt paths */}
        <g opacity={0.82}>
          {/* Ramen → Tea House */}
          <path d="M268,305 C375,282 462,372 520,388" stroke="#c4a46b" strokeWidth={20} fill="none" strokeLinecap="round" />
          <path d="M268,305 C375,282 462,372 520,388" stroke="#d4b483" strokeWidth={13} fill="none" strokeLinecap="round" strokeDasharray="5,9" />
          {/* Tea House → Bakery */}
          <path d="M592,387 C692,368 795,285 845,278" stroke="#c4a46b" strokeWidth={20} fill="none" strokeLinecap="round" />
          <path d="M592,387 C692,368 795,285 845,278" stroke="#d4b483" strokeWidth={13} fill="none" strokeLinecap="round" strokeDasharray="5,9" />
          {/* Ramen → Library */}
          <path d="M228,348 L196,492" stroke="#c4a46b" strokeWidth={18} fill="none" strokeLinecap="round" />
          <path d="M228,348 L196,492" stroke="#d4b483" strokeWidth={11} fill="none" strokeLinecap="round" strokeDasharray="5,9" />
          {/* Bakery → Post Office */}
          <path d="M882,322 L886,462" stroke="#c4a46b" strokeWidth={18} fill="none" strokeLinecap="round" />
          <path d="M882,322 L886,462" stroke="#d4b483" strokeWidth={11} fill="none" strokeLinecap="round" strokeDasharray="5,9" />
          {/* Tea House → Torii */}
          <path d="M560,356 C568,288 580,232 600,190" stroke="#c4a46b" strokeWidth={18} fill="none" strokeLinecap="round" />
          <path d="M560,356 C568,288 580,232 600,190" stroke="#d4b483" strokeWidth={11} fill="none" strokeLinecap="round" strokeDasharray="5,9" />
          {/* Library → Post Office (bottom) */}
          <path d="M230,548 C445,572 680,568 858,528" stroke="#c4a46b" strokeWidth={16} fill="none" strokeLinecap="round" />
          <path d="M230,548 C445,572 680,568 858,528" stroke="#d4b483" strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="5,9" />
        </g>

        {/* Wooden bridge over water */}
        {[585,590,596,602,608].map((bx, i) => (
          <rect key={i} x={bx} y={178} width={4} height={22} fill="#8b6914" rx={1} />
        ))}
        <rect x={581} y={175} width={38} height={5} fill="#a07820" rx={1} />
        <rect x={581} y={195} width={38} height={5} fill="#a07820" rx={1} />

        {/* Trees */}
        {TREES.map(([tx, ty], i) => (
          <g key={i} transform={`translate(${tx},${ty})`} filter="url(#softShadow)">
            <rect x={-3.5} y={0} width={7} height={18} fill="#6b4226" />
            <circle cx={0} cy={-10} r={15} fill="#5a9e48" />
            <circle cx={-9} cy={-4} r={10} fill="#4a8e38" />
            <circle cx={9} cy={-3} r={11} fill="#6aae58" />
          </g>
        ))}

        {/* Cherry blossom tree */}
        <g transform="translate(118,240)" filter="url(#softShadow)">
          <rect x={-5} y={-65} width={10} height={82} fill="#6b4226" />
          <circle cx={0} cy={-78} r={30} fill="#ffb7c5" opacity={0.92} />
          <circle cx={-20} cy={-65} r={20} fill="#ffc1cc" opacity={0.9} />
          <circle cx={20} cy={-62} r={22} fill="#ffaabb" opacity={0.9} />
          <circle cx={-6} cy={-94} r={18} fill="#ffccd5" opacity={0.9} />
        </g>

        {/* Flowers */}
        {FLOWERS.map(([fx, fy], i) => (
          <g key={i} transform={`translate(${fx},${fy})`}>
            <circle cx={0} cy={0} r={3.5} fill={["#ff6b6b","#ffd700","#ff9ff3","#ff6b6b","#ffd700","#ff9ff3","#ff6b6b","#ffd700","#ff9ff3"][i]} />
            <circle cx={6} cy={0} r={2.5} fill={["#ff9ff3","#ff6b6b","#ffd700"][i%3]} opacity={0.7} />
            <circle cx={-6} cy={0} r={2.5} fill={["#ffd700","#ff9ff3","#ff6b6b"][i%3]} opacity={0.7} />
          </g>
        ))}

        {/* Small pond */}
        <ellipse cx={422} cy={448} rx={38} ry={22} fill="#7ec8e3" opacity={0.7} />
        <motion.path d="M400,448 Q422,442 444,448" stroke="white" strokeWidth={1.5} fill="none" opacity={0.6}
          animate={{ d: ["M400,448 Q422,442 444,448","M400,451 Q422,445 444,451","M400,448 Q422,442 444,448"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Clouds */}
        {[
          { x: 0, y: 32, speed: 62, scale: 1.2 },
          { x: 420, y: 58, speed: 82, scale: 0.78 },
          { x: 820, y: 22, speed: 72, scale: 1.0 },
        ].map((c, i) => (
          <motion.g key={i} animate={{ x: [c.x - 200, c.x + 1400] }}
            transition={{ duration: c.speed, repeat: Infinity, ease: "linear" }}>
            <ellipse cx={0} cy={c.y} rx={52 * c.scale} ry={23 * c.scale} fill="white" opacity={0.72} />
            <ellipse cx={-32 * c.scale} cy={c.y + 6} rx={30 * c.scale} ry={17 * c.scale} fill="white" opacity={0.72} />
            <ellipse cx={42 * c.scale} cy={c.y + 6} rx={36 * c.scale} ry={19 * c.scale} fill="white" opacity={0.72} />
          </motion.g>
        ))}

        {/* Floating cherry petals */}
        {PETALS.map(p => (
          <motion.ellipse key={p.id}
            cx={p.sx} cy={-25} rx={p.size} ry={p.size * 0.55}
            fill="#ffb7c5" opacity={0.85}
            animate={{
              cy: [-25, 730],
              cx: [p.sx, p.sx + p.drift],
              rotate: [0, 360],
              opacity: [0.85, 0.85, 0],
            }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* ── Location buildings ── */}
        {LOCATIONS.map(loc => (
          // Outer g handles SVG positioning only
          <g key={loc.id} transform={`translate(${loc.sx},${loc.sy})`}>
            {/* Inner motion.g handles hover scale — isolated from positioning transform */}
            <motion.g
              onClick={() => toggle(loc.id)}
              style={{ cursor: "pointer", transformBox: "fill-box", transformOrigin: "center" }}
              whileHover={{ scale: 1.09 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Ground shadow */}
              <ellipse cx={0} cy={14} rx={42} ry={11} fill="rgba(0,0,0,0.12)" />

              <loc.Component isActive={active === loc.id} />

              {/* Label badge */}
              <g transform="translate(0,46)">
                <rect x={-42} y={-9} width={84} height={20} rx={10} fill="rgba(61,43,31,0.78)" />
                <text textAnchor="middle" y={6} fontSize={11} fill="white" fontWeight="800"
                  fontFamily="Nunito,Poppins,sans-serif">
                  {loc.label}
                </text>
              </g>

              {/* Floating "Visit" bubble */}
              {active !== loc.id && (
                <motion.g transform="translate(0,-128)"
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
                  <rect x={-28} y={-13} width={56} height={24} rx={12} fill="rgba(255,255,255,0.92)" />
                  <text textAnchor="middle" y={5} fontSize={12} fill="#c05621" fontWeight="900"
                    fontFamily="Nunito,Poppins,sans-serif">
                    {loc.emoji} Visit
                  </text>
                </motion.g>
              )}
            </motion.g>
          </g>
        ))}

        {/* Map footer banner */}
        <g transform="translate(600,652)">
          <rect x={-125} y={-18} width={250} height={32} rx={16} fill="rgba(61,43,31,0.72)" />
          <text textAnchor="middle" y={8} fontSize={13} fill="#f5e6c8" fontWeight="900"
            fontFamily="Nunito,Poppins,sans-serif" letterSpacing={0.5}>
            🗺️ Safyan's Village Map
          </text>
        </g>

        {/* Compass rose */}
        <g transform="translate(1152,648)">
          <circle r={27} fill="rgba(61,43,31,0.72)" />
          <text textAnchor="middle" y={-11} fontSize={9} fill="#f5e6c8" fontWeight="900">N</text>
          <text textAnchor="middle" y={19} fontSize={9} fill="#f5e6c8" fontWeight="900">S</text>
          <text x={14} y={5} fontSize={9} fill="#f5e6c8" fontWeight="900">E</text>
          <text x={-20} y={5} fontSize={9} fill="#f5e6c8" fontWeight="900">W</text>
          <polygon points="0,-24 3,-13 -3,-13" fill="#ffd700" />
          <line x1={0} y1={13} x2={0} y2={22} stroke="#f5e6c8" strokeWidth={1.5} />
        </g>
      </svg>

      {/* ── Info Panel ── */}
      <AnimatePresence>
        {active && loc && Panel && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 384,
              zIndex: 50, background: "#fffbf2",
              borderLeft: "3px solid #c05621",
              display: "flex", flexDirection: "column",
              boxShadow: "-8px 0 36px rgba(61,43,31,0.22)",
            }}
          >
            {/* Panel header */}
            <div style={{
              background: "linear-gradient(135deg,#c05621,#e67e22)",
              padding: "18px 22px 16px", flexShrink: 0,
            }}>
              <button onClick={() => setActive(null)} style={{
                background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.4)",
                color: "white", padding: "4px 14px", borderRadius: 20,
                cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 12,
                display: "block", fontFamily: "inherit",
              }}>
                ✕ Close
              </button>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{loc.emoji}</div>
              <h2 style={{ color: "white", margin: "0 0 2px", fontSize: 22, fontWeight: 900 }}>
                {loc.label}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.82)", margin: 0, fontSize: 13, fontWeight: 600 }}>
                📍 {loc.name}
              </p>
            </div>

            {/* Panel body */}
            <div style={{
              flex: 1, overflowY: "auto", padding: "18px 18px",
              scrollbarWidth: "thin", scrollbarColor: "#c05621 #f5e6c8",
            }}>
              <Panel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dim overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(61,43,31,0.22)",
              zIndex: 40,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapPortfolio;
