import React, { useState, useEffect, useCallback } from 'react';
import {
    Code,
    Zap,
    User,
    Star,
    Mail,
    Linkedin,
    Github,
    ChevronUp,
    GitBranch,
    Database,
    ExternalLink,
    Sun,
    Moon, MessageSquare,
    Smartphone,
    Laptop,
    ShoppingBag,
    MessageCircleCode,
    LucideMessageCircleMore

} from 'lucide-react';

import ProfileIMG from "./assets/images/profile_image1.jpg";

interface Link {
    name: string;
    href: string;
}

interface Skill {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    level: number; // 0-100
}

interface Project {
    title: string;
    description: string;
    technologies: string[];
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    link: string;
}

const navLinks: Link[] = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
];

const skillsData: Skill[] = [
    { name: 'Java', icon: Code, level: 95 },
    { name: 'Hibernate (JPA)', icon: Database, level: 90 },
    { name: 'MySQL / SQL', icon: Database, level: 90 },
    { name: 'Firebase / Firestore', icon: Database, level: 90 },
    { name: 'PHP', icon: Code, level: 85 },
    { name: 'HTML / CSS ', icon: Code, level: 88 },
    { name: 'Bootstrap', icon: Code, level: 80 },
    { name: 'Tailwind', icon: Code, level: 80 },
    { name: 'JavaScript', icon: Code, level: 80 },
    { name: 'TypeScript', icon: Code, level: 80 },
    { name: 'Github', icon: GitBranch, level: 75 },
    { name: 'React (Vite)', icon: Code, level: 85 },
    { name: 'Expo (React Native)', icon: Smartphone, level: 85 },
    { name: 'Java Swing', icon: Laptop, level: 75 },
    { name: 'Electron', icon: Laptop, level: 75 },
    { name: 'Android (Java)', icon: Smartphone, level: 75 },
    { name: 'IoT Development ', icon: Zap, level: 85 },
];


const projectsData: Project[] = [
    {
        title: 'IoT Smart Environment System',
        description: 'A real-time IoT monitoring and control system using Arduino Uno and ESP8266. It tracks temperature, humidity, light, and soil moisture, and allows both automatic and manual control of lights and fans.',
        technologies: ['Arduino', 'ESP8266', 'Java', 'Hibernate', 'MySQL', 'Expo'],
        icon: Code,
        link: '#',
    },
    {
        title: 'Distributed Online Auction System',
        description: 'An enterprise auction system using EJB and JMS, supporting real-time bidding and distributed architecture for scalable performance.',
        technologies: ['Java EE', 'EJB', 'JMS', 'Hibernate', 'MySQL'],
        icon: Code,
        link: '#',
    },
    {
        title: 'Banking System',
        description: 'A secure banking application that supports account management, fund transfers, and transaction history, using EJB interceptors for logging.',
        technologies: ['Java EE', 'EJB', 'Hibernate', 'MySQL'],
        icon: Code,
        link: 'https://github.com/Akila-Heshan/BCD2-Banking-Application',
    },
    {
        title: 'Chat Application',
        description: 'A real-time chat app built with Expo and Java backend. Includes user authentication and instant messaging features with Hibernate ORM.',
        technologies: ['Expo', 'React Native', 'Java', 'Hibernate', 'MySQL'],
        icon: MessageCircleCode,
        link: '#',
    },
    {
        title: 'E-Commerce Web Application',
        description: 'A responsive web-based e-commerce system with product listings, cart, and checkout. Features a Java Hibernate backend and MySQL database.',
        technologies: ['Java', 'Hibernate', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PayHere Payment Gateway'],
        icon: ShoppingBag,
        link: 'https://github.com/Akila-Heshan/Treasure_plant_web_application_Java',
    },
    {
        title: 'E-Commerce Mobile Application',
        description: 'A native Android e-commerce app with product browsing, cart management, and secure payments. Supports user authentication and location-based services.',
        technologies: ['Java', 'XML', 'Firebase Firestore', 'SQLite', 'Firebase Authentication', 'Google Maps API', 'PayHere Payment Gateway'],
        icon: ShoppingBag,
        link: 'https://github.com/Akila-Heshan/Treasure-plant-mobile-application',
    },
];

interface CommonProps {
    theme: 'dark' | 'light';
}

const SectionTitle: React.FC<{ children: React.ReactNode; theme: 'dark' | 'light' }> = ({ children, theme }) => {
    const textColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
    const borderColor = theme === 'dark' ? 'border-blue-400/50' : 'border-blue-600/30';
    return (
        <h2 className={`text-3xl sm:text-4xl font-extrabold ${textColor} mb-8 pb-2 border-b-4 ${borderColor} inline-block`}>
            {children}
        </h2>
    );
};

const Card: React.FC<{ children: React.ReactNode; className?: string; theme: 'dark' | 'light' }> = ({ children, className = '', theme }) => {
    const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
    const shadowColor = theme === 'dark' ? 'shadow-blue-500/30' : 'shadow-blue-400/30';
    const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';

    return (
        <div
            className={`${bgColor} p-6 rounded-xl shadow-xl transition-all duration-300 hover:${shadowColor} border ${borderColor} ${className}`}
        >
            {children}
        </div>
    );
};

const Header: React.FC<{ onNavigate: (href: string) => void; theme: 'dark' | 'light'; toggleTheme: () => void }> = ({ onNavigate, theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const headerBg = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const linkTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
    const hoverTextColor = theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-700';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 ${headerBg} bg-opacity-95 shadow-lg backdrop-blur-sm transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href="#" className="flex items-center space-x-2 text-xl font-bold text-blue-500 hover:text-blue-400 transition-colors duration-300">
                        <Code className="w-6 h-6 animate-pulse" />
                        <span>M.R.Akila Heshan</span>
                    </a>

                    <nav className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.href}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate(link.href);
                                }}
                                className={`${linkTextColor} ${hoverTextColor} transition-colors duration-300 font-medium relative group`}
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                            </a>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className={`${linkTextColor} ${hoverTextColor} p-2 rounded-full transition-colors duration-300`}
                            aria-label="Toggle Dark/Light Mode"
                        >
                            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                    </nav>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleTheme}
                            className={`${linkTextColor} ${hoverTextColor} p-2 rounded-full transition-colors duration-300 mr-2`}
                            aria-label="Toggle Dark/Light Mode"
                        >
                            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                        </button>
                        <button
                            className={`${linkTextColor} ${hoverTextColor}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`md:hidden transition-all duration-300 ease-in-out ${headerBg} ${
                    isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={`#${link.href}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate(link.href);
                                setIsOpen(false);
                            }}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${linkTextColor} hover:bg-gray-700 hover:text-blue-400 transition-colors duration-300`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

const HeroSection: React.FC<CommonProps> = ({ theme }) => {
    const roles = ['Software Engineer', 'Frontend Developer', 'Full-Stack Enthusiast'];
    const [currentText, setCurrentText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = roles[roleIndex];
            setCurrentText((prev) =>
                isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
            );

            if (!isDeleting && currentText === fullText) {
                setTypingSpeed(2000); // Pause at end
                setIsDeleting(true);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setRoleIndex((prev) => (prev + 1) % roles.length);
                setTypingSpeed(150);
            } else {
                setTypingSpeed(isDeleting ? 50 : 150);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, roleIndex, roles]);

    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const subtextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const animatedBorderColor = theme === 'dark' ? 'border-blue-500' : 'border-blue-700';

    return (
        <section id="hero" className={`min-h-screen relative flex items-center justify-center pt-16 ${textColor} overflow-hidden`}>
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <div className="relative inline-block mb-6">
                    <img
                        src={ProfileIMG}
                        alt="Profile Placeholder"
                        className={`w-36 h-36 rounded-full mx-auto object-cover border-4 border-blue-400 shadow-xl animate-bounce-slow`}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://placehold.co/150x150/${theme === 'dark' ? '1d4ed8' : '3b82f6'}/ffffff?text=P+H`;
                        }}
                    />
                    <div className={`absolute inset-0 rounded-full border-4 border-blue-400 animate-ping-slow`}></div>
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
                    Hi, I'm <span className="text-blue-500 transition-colors duration-300">M.R.Akila Heshan</span>
                </h1>
                <p className={`text-2xl sm:text-3xl font-light mb-8 h-8 ${textColor}`}>
                    I am a{' '}
                    <span className={`font-mono text-blue-500 border-r-4 ${animatedBorderColor} pr-1 animate-pulse transition-colors duration-300`}>
            {currentText}
          </span>
                </p>
                <p className={`text-lg mb-10 max-w-2xl mx-auto ${subtextColor}`}>
                    I build efficient, scalable, and modern web applications. Passionate about clean code and delivering exceptional user experiences.
                </p>
                <div className="flex justify-center space-x-4">
                    <a
                        href="#projects"
                        onClick={(e) => {e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });}}
                        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                    >
                        View Projects
                    </a>
                    <a
                        href="https://www.linkedin.com/in/akila-mangala-75654b2a3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-200'}`}
                    >
                        <Linkedin className="w-5 h-5" /> <span>LinkedIn</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

const AboutSection: React.FC<CommonProps> = ({ theme }) => {
    const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const cardBgColor = theme === 'dark' ? 'bg-gray-900/50' : 'bg-blue-50/50';

    return (
        <section id="about" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <SectionTitle theme={theme}>
                    <User className="inline-block mr-2 w-7 h-7" /> About Me
                </SectionTitle>
                <div className="grid md:grid-cols-2 gap-12 text-left items-center">
                    <div className={`space-y-6 text-lg text-justify ${textColor}`}>
                        <p>
                            I am a passionate and ambitious software engineering
                            undergraduate at the Java Institute, eager to dive deep into the ever-evolving world of technology. With a strong foundation in Java, PHP, MySQL, HTML, JavaScript, CSS, and frameworks like Bootstrap, EXPO and Hibernate, I specialize in both web and mobile application development. I have experience in creating dynamic web applications and developing mobile applications using Expo, alongside desktop software solutions with Java Swing and SQL databases.
                        </p>
                        <p>
                            Driven by curiosity and a desire for continuous learning, I see every challenge as an opportunity to grow both personally and professionally. Whether it's mastering new technologies or tackling coding puzzles, I'm always ready to push boundaries and expand my horizons in the field of software development.
                        </p>
                    </div>
                    <Card theme={theme} className={`shadow-inner p-8 ${cardBgColor}`}>
                        <h3 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>My Philosophy</h3>
                        <ul className={`space-y-3 list-none pl-0 ${textColor}`}>
                            <li className="flex items-start">
                                <Star className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0 animate-pulse" />
                                <span>**Performance First:** Focusing on fast load times and optimized rendering.</span>
                            </li>
                            <li className="flex items-start">
                                <Star className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0 animate-pulse" />
                                <span>**Scalability:** Designing systems that can handle growth without major overhauls.</span>
                            </li>
                            <li className="flex items-start">
                                <Star className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0 animate-pulse" />
                                <span>**Code Quality:** Writing clean, well-tested, and documented code.</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </section>
    );
};

const SkillsSection: React.FC<CommonProps> = ({ theme }) => {
    const skillNameColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const skillSubtextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    const skillBarBg = theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/40';
    const cardBg = theme === 'dark'
        ? 'bg-gray-800/30 backdrop-blur-md border border-gray-700'
        : 'bg-white/30 backdrop-blur-md border border-gray-200';

    return (
        <section id="skills" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <SectionTitle theme={theme}>
                    <Zap className="inline-block mr-2 w-7 h-7" /> Technical Skills
                </SectionTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((skill) => (
                        <Card key={skill.name} theme={theme} className={`${cardBg}`}>
                            <div className="flex items-center mb-3">
                                <skill.icon className="w-7 h-7 mr-3 flex-shrink-0" />
                                <h3 className={`text-xl font-semibold ${skillNameColor}`}>{skill.name}</h3>
                            </div>
                            <div className={`h-2.5 w-full ${skillBarBg} rounded-full overflow-hidden`}>
                                <div
                                    className="h-2.5 bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${skill.level}%` }}
                                ></div>
                            </div>
                            <p className={`text-right text-sm mt-1 ${skillSubtextColor}`}>{skill.level}% Proficiency</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectsSection: React.FC<CommonProps> = ({ theme }) => {
    const projectTitleColor = theme === 'dark' ? 'text-blue-300' : 'text-blue-700';
    const projectTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
    const cardBg = theme === 'dark'
        ? 'bg-gray-800/30 backdrop-blur-md border border-gray-700'
        : 'bg-white/30 backdrop-blur-md border border-gray-200';
    const buttonBg = theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600';

    return (
        <section id="projects" className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <SectionTitle theme={theme}>
                    <Star className="inline-block mr-2 w-7 h-7" /> Featured Projects
                </SectionTitle>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {projectsData.map((project, index) => (
                        <div
                            key={index}
                            className={`${cardBg} rounded-2xl p-6 shadow-xl transform transition-all duration-500 hover:-translate-y-3 hover:shadow-blue-500/40 hover:scale-[1.03] group`}
                        >
                            <div className="flex flex-col h-full justify-between">
                                {/* Header */}
                                <div>
                                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 mx-auto mb-4 group-hover:bg-blue-500/40 transition-all">
                                        {project.icon && <project.icon className="w-6 h-6 text-blue-400" />}
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-3 ${projectTitleColor} group-hover:text-blue-400 transition-all`}>
                                        {project.title}
                                    </h3>
                                    <p className={`mb-5 text-sm ${projectTextColor} leading-relaxed`}>
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap justify-center gap-2 mb-5">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className={`px-3 py-1 text-xs font-semibold rounded-full border border-blue-400/40 transition-all duration-300 group-hover:border-blue-500/70 ${
                                                theme === 'dark'
                                                    ? 'bg-blue-900/30 text-blue-200'
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-center">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center justify-center space-x-2 ${buttonBg} text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-all duration-300`}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>View Project</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background gradient blobs */}
            <div className="absolute inset-0 -z-10 opacity-30 blur-3xl">
                <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/3 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply animate-blob animation-delay-4000" />
            </div>
        </section>
    );
};


const ContactSection: React.FC<CommonProps> = ({ theme }) => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate API call delay
        setTimeout(() => {
            console.log('Form Submitted:', { name, email, message });

            if (Math.random() > 0.1) {
                setStatus('sent');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    const labelColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const inputBg = theme === 'dark' ? 'bg-gray-700/40' : 'bg-gray-50';
    const inputBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    const inputTextColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const placeholderColor = theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500';

    return (
        <section id="contact" className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <SectionTitle theme={theme}>
                    <MessageSquare className="inline-block mr-2 w-7 h-7" /> Connect \& Collaborate
                </SectionTitle>
                <p className={`text-lg mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                    If you have a job opportunity, a project collaboration, or just want to talk about the latest in tech, feel free to reach out—I’m always happy to connect!
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                    {/* Column 1: Social/CTA Card */}
                    <Card theme={theme} className={`p-8 flex flex-col justify-between shadow-blue-500/40 border-t-4 border-blue-500 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'}`}>
                        <div>
                            <h3 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                Direct Connections
                            </h3>
                            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                The fastest way to reach me and view my professional history and code contributions.
                            </p>

                            <div className="space-y-6">
                                {/* LinkedIn Card */}
                                <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className={`flex items-center p-4 rounded-lg transition-colors  duration-300 hover:shadow-lg ${theme === 'dark' ? 'bg-gray-700/40 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                    <LucideMessageCircleMore className="w-8 h-8 text-green-500 mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-xl font-semibold text-green-500">WhatsApp</p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Professional history and network.</p>
                                    </div>
                                </a>

                                <a href="https://www.linkedin.com/in/akila-mangala-75654b2a3/" target="_blank" rel="noopener noreferrer" className={`flex items-center p-4 rounded-lg transition-colors  duration-300 hover:shadow-lg ${theme === 'dark' ? 'bg-gray-700/40 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                    <Linkedin className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-xl font-semibold text-blue-500">LinkedIn Profile</p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Professional history and network.</p>
                                    </div>
                                </a>

                                {/* GitHub Card */}
                                <a href="https://github.com/Akila-Heshan" target="_blank" rel="noopener noreferrer" className={`flex items-center p-4 rounded-lg transition-colors duration-300 hover:shadow-lg ${theme === 'dark' ? 'bg-gray-700/40 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                    <Github className={`w-8 h-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mr-4 flex-shrink-0`} />
                                    <div>
                                        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>GitHub Repositories</p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>View my code and open source work.</p>
                                    </div>
                                </a>

                                {/* Email CTA */}
                                <div className={`flex items-center p-4 rounded-lg transition-colors duration-300 hover:shadow-lg ${theme === 'dark' ? 'bg-gray-700/40 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                    <Mail className="w-8 h-8 text-yellow-500 mr-4 flex-shrink-0" />
                                    <div>
                                        <p className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Email Me</p>
                                        <a href="mangalaakila412@gmail.com" className="text-blue-400 hover:underline">mangalaakila412@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card theme={theme} className={`p-8 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'}`}>
                        <h3 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                            Send a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${labelColor}`}>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} ${inputTextColor} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${placeholderColor}`}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${labelColor}`}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} ${inputTextColor} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${placeholderColor}`}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className={`block text-sm font-medium mb-1 ${labelColor}`}>Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className={`w-full px-4 py-3 rounded-lg ${inputBg} border ${inputBorder} ${inputTextColor} focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none ${placeholderColor}`}
                                    placeholder="Tell me about your project or question..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full py-3 px-4 font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-white ${
                                    status === 'sending'
                                        ? 'bg-blue-600/70 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600 shadow-xl hover:shadow-blue-500/50'
                                }`}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : status === 'sent' ? (
                                    'Message Sent Successfully!'
                                ) : status === 'error' ? (
                                    'Error Sending Message'
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                        {status === 'sent' && (
                            <p className="mt-4 text-green-500 text-center font-medium transition-opacity duration-300 opacity-100">
                                Thank you! I will get back to you shortly.
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-red-500 text-center font-medium transition-opacity duration-300 opacity-100">
                                Oops! Something went wrong. Please try again or contact me directly via email.
                            </p>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
};

const FooterSection: React.FC<CommonProps> = ({ theme }) => {
    const footerBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200';
    const iconColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const copyrightColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-500';

    return (
        <footer className={`${footerBg} py-8 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a
                        href="https://github.com/Akila-Heshan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconColor} hover:text-blue-500 transition-colors duration-300 transform hover:scale-110`}
                        aria-label="GitHub Profile"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/akila-mangala-75654b2a3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${iconColor} hover:text-blue-500 transition-colors duration-300 transform hover:scale-110`}
                        aria-label="LinkedIn Profile"
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                        href="mangalaakila412@gmail.com"
                        className={`${iconColor} hover:text-blue-500 transition-colors duration-300 transform hover:scale-110`}
                        aria-label="Email"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
                <p className={`text-sm ${copyrightColor}`}>
                    &copy; {new Date().getFullYear()} Akila Heshan. Built with React & Tailwind CSS.
                </p>
            </div>
        </footer>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
    const [showScroll, setShowScroll] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    const handleSmoothScroll = useCallback((href: string) => {
        const element = document.getElementById(href);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 64, // Offset for fixed header
                behavior: 'smooth',
            });
        }
    }, []);

    const rootClass = theme === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-gray-100/10 text-gray-900';

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 overflow-x-hidden scrollbar-hide ${rootClass}`} style={{ fontFamily: 'Inter, sans-serif' }}>

            <style>{`
        /* Custom Keyframes for a smooth, slow bounce on profile picture */
        @keyframes bounce-slow {
            0%, 100% {
                transform: translateY(-2%);
            }
            50% {
                transform: translateY(2%);
            }
        }
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite ease-in-out;
        }

        /* Custom Keyframes for a slow, subtle ping effect */
        @keyframes ping-slow {
            75%, 100% {
                transform: scale(1.1);
                opacity: 0;
            }
        }
        .animate-ping-slow {
            animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /* Custom Keyframes for the Blob Background Animation */
        @keyframes blob {
            0% {
                transform: translate(0, 0) scale(1);
            }
            33% {
                transform: translate(30px, -50px) scale(1.1);
            }
            66% {
                transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
                transform: translate(0, 0) scale(1);
            }
        }

        .animate-blob {
            animation: blob 7s infinite cubic-bezier(0.42, 0, 0.58, 1);
        }

        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
        
        html {
            scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
            width: 0;
            height: 0;
         }
        html, body {
            scrollbar-width: none; 
            -ms-overflow-style: none; 
        }
      `}</style>

            <Header onNavigate={handleSmoothScroll} theme={theme} toggleTheme={toggleTheme} />

            {/* Your ORIGINAL main content structure is restored below */}
            <main className="relative z-10">
                <div className="absolute inset-0 z-0 ">
                    <div className={`animate-blob animation-delay-0 ${theme === 'dark' ? 'bg-blue-500 opacity-20' : 'bg-blue-300 opacity-40'} rounded-full filter blur-xl w-64 h-64 absolute top-1/4 right-0 transform -translate-x-1/2 -translate-y-1/2`}></div>
                    <div className={`animate-blob animation-delay-0 ${theme === 'dark' ? 'bg-purple-500 opacity-20' : 'bg-purple-300 opacity-40'} rounded-full filter blur-xl w-80 h-80 absolute bottom-1/6 right-1/4 transform translate-x-1/2 translate-y-1/2`}></div>
                    <div className={`animate-blob animation-delay-0 ${theme === 'dark' ? 'bg-pink-500 opacity-20' : 'bg-pink-300 opacity-40'} rounded-full filter blur-xl w-72 h-72 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>
                    <div className={`animate-blob animation-delay-0 ${theme === 'dark' ? 'bg-yellow-500 opacity-20' : 'bg-yellow-300 opacity-40'} rounded-full filter blur-xl w-60 h-60 absolute top-1/3 left-0 transform translate-x-1/2 -translate-y-1/2`}></div>
                    <div className={`animate-blob animation-delay-0 ${theme === 'dark' ? 'bg-cyan-500 opacity-20' : 'bg-cyan-300 opacity-40'} rounded-full filter blur-xl w-52 h-52 absolute top-40 right-1/4 transform translate-x-1/2 -translate-y-1/2`}></div>
                    <div className={`animate-blob animation-delay-0 ${theme === 'dark' ? 'bg-indigo-500 opacity-20' : 'bg-indigo-300 opacity-40'} rounded-full filter blur-xl w-72 h-72 absolute bottom-0 left-0 transform translate-x-1/4 translate-y-1/4`}></div>
                    <div className={`animate-blob animation-delay-0 ${theme === 'dark' ? 'bg-indigo-500 opacity-20' : 'bg-indigo-300 opacity-40'} rounded-full filter blur-xl w-72 h-72 absolute top-1/12 right-1/2  transform translate-x-1/4 translate-y-1/4`}></div>
                </div>
                <HeroSection theme={theme} />
                <AboutSection theme={theme} />
                <SkillsSection theme={theme} />
                <ProjectsSection theme={theme} />
                <ContactSection theme={theme} />
            </main>

            <FooterSection theme={theme} />

            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full shadow-lg transition-opacity duration-300 z-50 hover:bg-blue-600 transform hover:scale-110 ${
                    showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-6 h-6" />
            </button>
        </div>
    );
};

export default App;



