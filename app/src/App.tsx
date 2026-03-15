import { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  CheckCircle,
  FileText,
  Calculator,
  Building2,
  Users,
  Monitor,
  Menu,
  X,
  MessageCircle,
  Send,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react';

// Custom hook for scroll animations
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#154360]/95 backdrop-blur-xl shadow-2xl py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="GPC Logo" 
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <span className="text-white font-condensed font-semibold text-lg md:text-xl tracking-widest">
              GPC
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: 'Services', id: 'services' },
              { label: 'Industries', id: 'industries' },
              { label: 'Team', id: 'team' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/70 hover:text-white font-body text-sm font-medium tracking-wide transition-all duration-300 hover:tracking-wider"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary text-sm"
            >
              <span className="flex items-center gap-2">
                Request a Proposal
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-white/10 space-y-3">
            {[
              { label: 'Services', id: 'services' },
              { label: 'Industries', id: 'industries' },
              { label: 'Team', id: 'team' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-white/80 hover:text-white font-body text-sm py-2 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-3 rounded-full font-medium text-sm mt-2 transition-colors"
            >
              Request a Proposal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a5276] via-[#1a5276] to-[#154360]" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 animate-slide-in-left">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#17a2b8] to-[#48c9b0] rounded-2xl opacity-30 group-hover:opacity-50 blur-xl transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="/hero-meeting.jpg" 
                  alt="Professional team meeting at Growth Path Consultants" 
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
                  loading="eager"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a5276]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left animate-slide-in-right">
            <div className="inline-flex items-center gap-2 bg-[#17a2b8]/20 border border-[#17a2b8]/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#48c9b0] rounded-full animate-pulse" />
              <span className="text-[#48c9b0] font-accent text-xs tracking-widest">ICPAK REGISTERED</span>
            </div>
            
            <h1 className="text-white mb-4 leading-[1.1]">
              Growth Path<br />
              <span className="gradient-text">Consultants</span>
            </h1>
            
            <p className="text-[#48c9b0] font-accent text-sm md:text-base tracking-[0.2em] mb-6">
              Audit • Tax • Advisory
            </p>
            
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              ICPAK-certified public accountants providing professional audit, tax, and advisory services across Kenya. Trusted by 500+ clients for over 15 years.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToServices}
                className="btn-primary"
              >
                <span className="flex items-center justify-center gap-2">
                  Explore Our Services
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              
              <a 
                href="tel:+254722571633"
                className="inline-flex items-center justify-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full px-6 py-3.5 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Call Us</span>
              </a>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#17a2b8]" />
                <span className="text-xs font-accent tracking-wide">Nairobi • Eldoret • Kericho</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Value Proposition Section
function ValueProposition() {
  const { ref, isVisible } = useScrollReveal();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const values = [
    {
      icon: Lightbulb,
      title: 'Clarity',
      description: 'We translate complexity into clear, actionable insight—so you can make decisions with confidence.',
      link: 'How we work',
      linkId: 'approach',
      tagline: 'Risk-based audit methodology'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Independence, objectivity, and strict confidentiality are not add-ons—they are built into every engagement.',
      link: 'Meet the team',
      linkId: 'team',
      tagline: 'ICPAK-registered • Independent • Confidential'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We help you protect value, reduce risk, and build momentum—so your business can move forward with confidence.',
      link: 'View industries',
      linkId: 'industries',
      tagline: 'Tax • Advisory • Compliance'
    }
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className={`group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#17a2b8]/20 flex items-center justify-center group-hover:bg-[#17a2b8]/30 transition-colors">
                  <value.icon className="w-5 h-5 text-[#48c9b0]" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#48c9b0] transition-colors">
                  {value.title}
                </h3>
              </div>
              
              <p className="text-white/70 mb-5 leading-relaxed">
                {value.description}
              </p>
              
              <button 
                onClick={() => scrollToSection(value.linkId)}
                className="text-[#48c9b0] hover:text-[#17a2b8] font-medium inline-flex items-center gap-2 text-sm group/btn transition-colors"
              >
                {value.link}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-white/40 text-xs mt-4 font-accent tracking-wider">
                {value.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: FileText,
      title: 'Audit & Assurance',
      description: 'Comprehensive statutory audits, internal controls assessment, due diligence, and expenditure audits.',
      items: ['Statutory Audits', 'Internal Controls', 'Due Diligence', 'Expenditure Audits', 'Risk Assessment']
    },
    {
      icon: Calculator,
      title: 'Tax Consultancy',
      description: 'Full tax compliance services, health checks, dispute resolution, and strategic tax planning.',
      items: ['Tax Compliance', 'Tax Health Checks', 'Dispute Resolution', 'Tax Planning', 'VAT Advisory']
    },
    {
      icon: Building2,
      title: 'Business Registration',
      description: 'Complete company setup services, documentation, and regulatory filings support.',
      items: ['Company Setup', 'Business Registration', 'Regulatory Filings', 'Documentation', 'Compliance']
    },
    {
      icon: Users,
      title: 'HR Consulting',
      description: 'Human resource audits, policy implementation, and compliance management.',
      items: ['HR Audits', 'Policy Implementation', 'Compliance', 'Employee Records', 'Training']
    },
    {
      icon: Monitor,
      title: 'ICT Consulting',
      description: 'Systems audits, digital transformation guidance, and cybersecurity assessments.',
      items: ['Systems Audits', 'Digital Transformation', 'Security', 'Data Management', 'IT Strategy']
    }
  ];

  return (
    <section id="services" ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#154360]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-[#48c9b0] font-accent text-xs tracking-[0.2em] uppercase mb-3">
            What We Do
          </span>
          <h2 className="text-white mb-4">
            Comprehensive Audit, Tax &<br />Advisory Services
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Tailored solutions designed to meet your unique business needs and regulatory requirements.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`card-professional p-6 md:p-8 hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#17a2b8]/30 to-[#48c9b0]/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-[#48c9b0]" />
              </div>
              
              <h3 className="font-serif text-xl text-white mb-3">
                {service.title}
              </h3>
              
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="text-white/50 text-sm flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#17a2b8] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <button 
            onClick={scrollToContact}
            className="btn-primary"
          >
            <span className="flex items-center gap-2">
              Request a Proposal
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Industries Section
function IndustriesSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const industries = [
    { name: 'SACCOs', description: 'Cooperative societies' },
    { name: 'Manufacturing', description: 'Production & industry' },
    { name: 'Education', description: 'Schools & universities' },
    { name: 'Health', description: 'Hospitals & clinics' },
    { name: 'NGOs', description: 'Non-profit organizations' },
    { name: 'Hospitality', description: 'Hotels & tourism' },
  ];

  return (
    <section id="industries" ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#154360]/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-[#48c9b0] font-accent text-xs tracking-[0.2em] uppercase mb-3">
            Industries We Serve
          </span>
          <h2 className="text-white max-w-3xl">
            From Cooperative Societies to Manufacturers and Healthcare Institutions
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            We understand the unique risks and regulations that matter in your industry.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => (
            <div 
              key={industry.name}
              className={`group glass rounded-xl p-5 md:p-6 text-center hover-glow cursor-pointer ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <p className="text-white font-semibold text-base md:text-lg mb-1 group-hover:text-[#48c9b0] transition-colors">
                {industry.name}
              </p>
              <p className="text-white/40 text-xs">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Approach Section
function ApproachSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const steps = [
    { 
      number: '01', 
      title: 'Plan', 
      description: 'Comprehensive risk assessment and strategic planning tailored to your business needs.' 
    },
    { 
      number: '02', 
      title: 'Execute', 
      description: 'Meticulous fieldwork and thorough documentation with attention to detail.' 
    },
    { 
      number: '03', 
      title: 'Report', 
      description: 'Clear insights and actionable recommendations that drive business decisions.' 
    },
  ];

  return (
    <section id="approach" ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-[#48c9b0] font-accent text-xs tracking-[0.2em] uppercase mb-3">
            Our Approach
          </span>
          <h2 className="text-white max-w-3xl">
            Plan, Execute, Report — With Precision
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Every engagement follows our proven methodology to deliver consistent, high-quality results.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#17a2b8]/50 to-transparent" />
              )}
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#17a2b8] to-[#138496] flex items-center justify-center mb-5 shadow-lg shadow-[#17a2b8]/20">
                <span className="font-serif text-2xl text-white font-bold">{step.number}</span>
              </div>
              
              <h3 className="font-serif text-2xl text-white mb-3">
                {step.title}
              </h3>
              
              <p className="text-white/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <p className="text-white/40 text-sm font-accent tracking-wider">
            Risk-based • Standards-driven • Practical
          </p>
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const team = [
    { initials: 'MO', name: 'CPA Martin Omondi', role: 'Managing Partner', description: 'Over 15 years experience in Tax and Financial Audits, Business Advisory and Management consultancy.' },
    { initials: 'NK', name: 'CPA Nicholas Kandie', role: 'Partner', description: 'Over 15 years in Advisory, Audit and Management consultancy. Certified Fraud Investigator.' },
    { initials: 'SO', name: 'CPA Spencer Ololchike', role: 'Partner', description: 'Over 15 years in finance, audit, and governance. Member of Tax Appeal Tribunal.' },
    { initials: 'MN', name: 'CPA Moses Ndirangu', role: 'Audit Manager', description: 'Over 12 years in audit management, taxation, and financial consultancy across diverse sectors.' },
    { initials: 'BK', name: 'Brian Kibor', role: 'Tax Consultant', description: 'Over 10 years experience specializing in tax matters, tax health checks, and dispute resolution.' },
    { initials: 'LK', name: 'CPA Langat Kibet', role: 'Consultant', description: 'Over 15 years in business consultancy, accounting, Tax & Financial Audits.' },
  ];

  return (
    <section id="team" ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#154360]/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-[#48c9b0] font-accent text-xs tracking-[0.2em] uppercase mb-3">
            Our Leadership
          </span>
          <h2 className="text-white max-w-3xl">
            Partner-Led Engagements
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Supported by experienced managers and specialists dedicated to your success.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div 
              key={member.name}
              className={`card-professional p-6 hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#17a2b8] to-[#138496] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#17a2b8]/20">
                  <span className="font-serif text-lg text-white font-bold">
                    {member.initials}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#48c9b0] text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 mt-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <button className="text-[#48c9b0] hover:text-[#17a2b8] font-medium inline-flex items-center gap-2 text-sm transition-colors">
            View full team
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={scrollToContact}
            className="text-[#48c9b0] hover:text-[#17a2b8] font-medium inline-flex items-center gap-2 text-sm transition-colors"
          >
            Work with us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Client Reviews Section
function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const testimonials = [
    {
      quote: "Growth Path Consultants transformed our financial reporting. Their audit was thorough and they provided actionable recommendations that helped us improve our internal controls significantly.",
      name: "James Mwangi",
      role: "Finance Director",
      company: "Nairobi Manufacturing Ltd"
    },
    {
      quote: "Working with GPC for our tax compliance has been excellent. They handled our KRA matters professionally and saved us from potential penalties.",
      name: "Grace Wanjiku",
      role: "CEO",
      company: "Transcounties SACCO"
    },
    {
      quote: "The team at GPC is knowledgeable and responsive. They conducted our statutory audit efficiently and delivered the report well before the deadline.",
      name: "Dr. Peter Ochieng",
      role: "Principal",
      company: "Baraton University College"
    },
    {
      quote: "We've been using GPC's services for 3 years now. Their tax health check identified issues we didn't know existed.",
      name: "Sarah Achieng",
      role: "Managing Director",
      company: "Giftmart Supermarkets"
    },
    {
      quote: "Professional, reliable, and thorough. GPC handled our NGO audit with great attention to detail.",
      name: "Michael Kiptoo",
      role: "Program Manager",
      company: "African Grain Care Equipment"
    },
    {
      quote: "The HR audit conducted by GPC helped us streamline our policies and ensure compliance with labor laws.",
      name: "Elizabeth Chemutai",
      role: "HR Manager",
      company: "Brookewood Limited"
    },
    {
      quote: "The team at GPC is highly skilled and organized, ensuring every stage of the audit process is completed efficiently.",
      name: "Hillary Kitur",
      role: "C.E.O",
      company: "Olenguruone Dairy Farmers Cooperative"
    },
    {
      quote: "GPC demonstrated a high level of professionalism, technical competence, and diligence throughout our engagement.",
      name: "Patrick Sang",
      role: "Hon. Secretary",
      company: "Kericho Club"
    }
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-block text-[#48c9b0] font-accent text-xs tracking-[0.2em] uppercase mb-3">
            Client Reviews
          </span>
          <h2 className="text-white">
            What Our Clients Say
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Trusted by 500+ businesses across Kenya for professional audit, tax, and advisory services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`card-professional p-6 hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#f4d03f]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-medium text-sm">{testimonial.name}</p>
                <p className="text-[#48c9b0] text-xs">{testimonial.role}</p>
                <p className="text-white/40 text-xs">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stats Section
function StatsSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const stats = [
    { value: '500+', label: 'Clients Served' },
    { value: '15+', label: 'Years Experience' },
    { value: '3', label: 'Office Locations' },
  ];

  return (
    <section ref={ref} className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#154360] via-[#1a5276] to-[#154360] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20 lg:gap-28">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`text-center ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <p className="font-serif text-5xl md:text-6xl lg:text-7xl gradient-text mb-2">{stat.value}</p>
              <p className="text-white/60 font-accent tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Insights Section
function InsightsSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const insights = [
    { title: 'Regulatory Updates', description: 'Stay informed on changes to accounting standards and compliance requirements.' },
    { title: 'Tax Alerts', description: 'Timely updates on tax legislation and KRA compliance matters.' },
    { title: 'Industry Briefs', description: 'Sector-specific analysis and risk considerations for your business.' },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <span className="inline-block text-[#48c9b0] font-accent text-xs tracking-[0.2em] uppercase mb-3">
              Insights
            </span>
            <h2 className="text-white mb-6">
              Practical Guidance for Business Leaders
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Stay ahead with our expert insights on compliance, reporting, and risk management—written for leaders who need answers fast.
            </p>
            
            <div className="space-y-5">
              {insights.map((item, index) => (
                <div 
                  key={item.title} 
                  className={`flex items-start gap-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#17a2b8]/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#48c9b0]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className={`mt-8 text-[#48c9b0] hover:text-[#17a2b8] font-medium inline-flex items-center gap-2 transition-colors ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              Read updates
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="glass rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#48c9b0]" />
                <span className="text-white/60 text-sm font-accent tracking-wider">LATEST UPDATES</span>
              </div>
              
              <div className="space-y-4">
                {[
                  'New KRA Tax Filing Requirements 2025',
                  'Updated ICPAK Audit Standards',
                  'SACCO Compliance Guidelines Update'
                ].map((update, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <ArrowRight className="w-4 h-4 text-[#17a2b8]" />
                    <span className="text-white/80 text-sm">{update}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section with Netlify Form
function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('Sending your message...');
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thank you! Your message has been sent. We will respond within one business day.');
      setFormState({ name: '', email: '', organization: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#154360]/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <span className="inline-block text-[#48c9b0] font-accent text-xs tracking-[0.2em] uppercase mb-3">
              Get In Touch
            </span>
            <h2 className="text-white mb-4">
              Tell Us What You Need
            </h2>
            <p className="text-white/60 text-lg mb-8">
              We'll respond within one business day. Let's discuss how we can help your business grow.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#17a2b8]/20 flex items-center justify-center group-hover:bg-[#17a2b8]/30 transition-colors">
                  <Mail className="w-5 h-5 text-[#48c9b0]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-accent tracking-wider mb-1">EMAIL</p>
                  <a href="mailto:gpcglobalconsult@gmail.com" className="text-white hover:text-[#48c9b0] transition-colors">
                    gpcglobalconsult@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#17a2b8]/20 flex items-center justify-center group-hover:bg-[#17a2b8]/30 transition-colors">
                  <Phone className="w-5 h-5 text-[#48c9b0]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-accent tracking-wider mb-1">PHONE</p>
                  <a href="tel:+254722571633" className="text-white hover:text-[#48c9b0] transition-colors">
                    +254 722 571633
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#17a2b8]/20 flex items-center justify-center group-hover:bg-[#17a2b8]/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#48c9b0]" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-accent tracking-wider mb-1">WHATSAPP</p>
                  <a 
                    href="https://wa.me/254719168491" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#48c9b0] transition-colors"
                  >
                    +254 719 168 491
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-white font-semibold mb-4 font-accent tracking-wider text-sm">OUR OFFICES</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#48c9b0] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Nairobi</p>
                    <p className="text-white/50 text-sm">National Bank of Kenya Building, Harambee Avenue-South Podium, 1st Floor</p>
                    <p className="text-white/40 text-xs mt-1">P.O. BOX 5327 - 00100</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#48c9b0] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Eldoret</p>
                    <p className="text-white/50 text-sm">Musco Towers Mezzanine Floor</p>
                    <p className="text-white/40 text-xs mt-1">P.O. BOX 5449 - 30100</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#48c9b0] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm">Kericho</p>
                    <p className="text-white/50 text-sm">Bethany Centre, 2nd Floor, Opp KCB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#154360]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#17a2b8] focus:ring-2 focus:ring-[#17a2b8]/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#154360]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#17a2b8] focus:ring-2 focus:ring-[#17a2b8]/20 transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-white/70 text-sm font-medium mb-2">Organization (Optional)</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formState.organization}
                    onChange={handleChange}
                    className="w-full bg-[#154360]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#17a2b8] focus:ring-2 focus:ring-[#17a2b8]/20 transition-all"
                    placeholder="Your Company Ltd"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/70 text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-[#154360]/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#17a2b8] focus:ring-2 focus:ring-[#17a2b8]/20 transition-all resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </button>

                {submitMessage && (
                  <p className={`text-center text-sm ${submitMessage.includes('Thank you') ? 'text-[#48c9b0]' : 'text-white/60'}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/50 text-sm mb-3">Prefer instant messaging?</p>
              <a
                href="https://wa.me/254719168491"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#154360]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="GPC Logo" className="h-10 w-auto" />
              <span className="text-white font-condensed font-semibold text-xl tracking-widest">GPC</span>
            </div>
            <p className="text-[#48c9b0] font-medium mb-2">
              Clarity. Integrity. Growth.
            </p>
            <p className="text-white/50 text-sm max-w-md leading-relaxed">
              Growth Path Consultants is an ICPAK-certified public accountancy firm providing audit, tax, and advisory services across Kenya.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-semibold mb-4 font-accent tracking-wider text-sm">QUICK LINKS</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Services', id: 'services' },
                { label: 'Industries', id: 'industries' },
                { label: 'Our Team', id: 'team' },
                { label: 'Contact Us', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/50 hover:text-[#48c9b0] text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold mb-4 font-accent tracking-wider text-sm">CONTACT</p>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="mailto:gpcglobalconsult@gmail.com"
                  className="text-white/50 hover:text-[#48c9b0] text-sm transition-colors"
                >
                  gpcglobalconsult@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+254722571633"
                  className="text-white/50 hover:text-[#48c9b0] text-sm transition-colors"
                >
                  +254 722 571633
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254719168491"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-[#48c9b0] text-sm transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Growth Path Consultants. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm">ICPAK Registered</span>
            <span className="text-white/20">|</span>
            <span className="text-white/40 text-sm">CPA (K)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-[#1a5276]">
      <Navigation />
      <main>
        <HeroSection />
        <ValueProposition />
        <ServicesSection />
        <IndustriesSection />
        <ApproachSection />
        <TeamSection />
        <TestimonialsSection />
        <StatsSection />
        <InsightsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
