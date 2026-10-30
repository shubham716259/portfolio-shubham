import { useEffect, useRef, useState } from 'react';

const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'Java', level: 65 },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'AWS', level: 60 },
    ],
  },
];

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateNavigation = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        const currentSection = navigation.find(({ id }) => {
          const section = document.getElementById(id);
          if (!section) return false;
          const bounds = section.getBoundingClientRect();
          return bounds.top <= 140 && bounds.bottom > 140;
        });
        if (currentSection) setActiveSection(currentSection.id);
        ticking = false;
      });
    };

    window.addEventListener('scroll', updateNavigation, { passive: true });
    updateNavigation();
    return () => window.removeEventListener('scroll', updateNavigation);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <a className="navbar-logo" href="#home" onClick={closeMenu}>
        Shubham Thakur
      </a>
      <ul id="primary-navigation" className={`navbar-links${menuOpen ? ' is-open' : ''}`}>
        {navigation.map(({ label, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`navbar-link${activeSection === id ? ' active' : ''}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={closeMenu}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="navbar-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">Full Stack Developer</div>
        <h1>
          I&apos;m <span className="hero-name">Shubham Thakur</span>
        </h1>
        <p className="hero-subtitle">
          Building scalable web applications with clean code and modern technologies
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="#contact" className="btn btn-secondary">Get in Touch</a>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="code-card">
          <div className="code-card-top">
            <span />
            <span />
            <span />
            <p>portfolio.js</p>
          </div>
          <pre>
            <span className="code-muted">const</span> developer = {'{\n'}
            {'  '}name: <span className="code-accent">&apos;Shubham&apos;</span>,{'\n'}
            {'  '}focus: <span className="code-accent">&apos;Full stack&apos;</span>,{'\n'}
            {'  '}building: <span className="code-accent">&apos;for people&apos;</span>
            {'\n};\n\n'}
            <span className="code-muted">while</span> (curious) {'{\n'}
            {'  '}learn();{'\n'}
            {'  '}create();{'\n'}
            {'}'}
          </pre>
        </div>
      </div>
      <a className="hero-scroll-indicator" href="#about" aria-label="Scroll to About">
        <span className="scroll-arrow" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </a>
    </header>
  );
}

function Stat({ target, label }) {
  const [value, setValue] = useState(0);
  const statRef = useRef(null);

  useEffect(() => {
    const element = statRef.current;
    if (!element) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setValue(target);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1000;

      const animate = now => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.floor(target * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) window.requestAnimationFrame(animate);
      };

      window.requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.5 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat" ref={statRef}>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function SectionHeader({ tag, title }) {
  return (
    <div className="section-header">
      <span className="section-tag">{tag}</span>
      <h2>{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <SectionHeader tag="About Me" title="Hello, I'm Shubham" />
      <div className="about-content">
        <div className="about-image">
          <div className="image-placeholder" role="img" aria-label="Profile picture placeholder for Shubham Thakur">
            <div className="initials">ST</div>
          </div>
        </div>
        <div className="about-text">
          <p>
            I&apos;m a passionate full-stack developer with expertise in modern web technologies and a love for
            building intuitive, performant user interfaces. I thrive on turning complex requirements into clean,
            maintainable code.
          </p>
          <div className="about-stats">
            <Stat target={8} label="Years of Experience" />
            <Stat target={25} label="Projects Delivered" />
            <Stat target={5} label="Tech Stacks" />
          </div>
          <div className="about-description">
            <p>
              Beyond code, I enjoy exploring emerging technologies, contributing to open source, and mentoring
              junior developers. I believe in writing code that&apos;s not just functional, but elegant and easy
              to understand.
            </p>
            <p>
              I&apos;m constantly learning and adapting to new frameworks and methodologies, always with a focus
              on delivering the best possible experience for end-users.
            </p>
          </div>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="GitHub">
              <span aria-hidden="true">GH</span>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <span aria-hidden="true">in</span>
            </a>
            <a href="#" className="social-link" aria-label="Twitter/X">
              <span aria-hidden="true">X</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects" id="projects">
      <SectionHeader tag="Featured Projects" title="Selected Work" />
      <div className="projects-grid">
        <p className="projects-empty">Project showcases will appear here soon.</p>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <SectionHeader tag="Skills" title="Technical Stack" />
      <div className="skills-container">
        {skillGroups.map(group => (
          <div className="skill-category" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skill-bars">
              {group.skills.map(skill => (
                <div className="skill-bar" key={skill.name}>
                  <span>{skill.name}</span>
                  <div
                    className="skill-progress"
                    role="progressbar"
                    aria-label={`${skill.name} proficiency`}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow={skill.level}
                  >
                    <span style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ onSubmit }) {
  return (
    <section className="contact" id="contact">
      <SectionHeader tag="Contact" title="Get In Touch" />
      <div className="contact-content">
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" autoComplete="name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Your Email" autoComplete="email" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="Your Message" rows="4" required />
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
        <div className="contact-info">
          <h3>Let&apos;s collaborate</h3>
          <p>
            I&apos;m open to new opportunities, projects, and collaborations. Feel free to reach out via the form
            or connect with me on social media.
          </p>
          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-icon" aria-hidden="true">📧</span>
              <span className="detail-value">shubhamthakur@example.com</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon" aria-hidden="true">📍</span>
              <span className="detail-value">Location: Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const handleContactSubmit = event => {
    event.preventDefault();
    setToast('This demo form is not connected yet. Please use the email listed here.');
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 5000);
  };

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact onSubmit={handleContactSubmit} />
      </main>
      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Shubham Thakur. All rights reserved.</p>
          <p>Built with modern web technologies</p>
        </div>
      </footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

export default App;
