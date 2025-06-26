"use client"
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ChevronRight, Twitter } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import { useAuth } from '../context/AuthContext';
import { LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { RouteGuard } from '../../app/utils/RouteGuard';
import cross from "../../../public/images/cross.png"
import tick from "../../../public/images/tick.png"
import {
    Home,
    Briefcase,
    Users,
    FileText,
    Calendar,
    Search,
    Plus,
    User,
    Menu,
    Download, Upload, Pencil,
    FileArchive,
    X, CheckCircle2, XCircle, Mail, Linkedin, Target
} from 'lucide-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Candidate() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const handleNavigation = (href) => (e) => {
        e.preventDefault();
        router.push(href);
    };
    const handleLogout = () => {
        logout();
    };
    const dropdownRef = useRef(null);
    const [isLogoutOpen, setLogoutIsOpen] = useState(false);
    const { logout, add_candidate, user, add_job } = useAuth();

    const requirements = [
        { id: 1, name: "Technical Skills", met: true },
        { id: 2, name: "Communication", met: true },
        { id: 3, name: "Punctuality", met: false },
        { id: 4, name: "Teamwork", met: true },
        { id: 5, name: "Problem Solving", met: true },
        { id: 6, name: "Adaptability", met: true },
        { id: 7, name: "Leadership", met: true },
        { id: 8, name: "Quality of Work", met: true },
        { id: 9, name: "Initiative", met: false },
        { id: 10, name: "Meeting Deadlines", met: true },
    ];

    const metCount = requirements.filter(req => req.met).length;
    const percentage = (metCount / requirements.length) * 100;


    const navigation = [
        { name: 'Home', icon: Home, href: '/', current: true },
        { name: 'Jobs', icon: Briefcase, href: '/admin', current: false },
        { name: 'Candidates', icon: Users, href: '/candidates', current: false },
        { name: 'Reports', icon: FileText, href: '/login', current: false },
        { name: 'Calendar', icon: Calendar, href: '/projects', current: false },
    ];

    const CircularProgress = ({ percentage, size = 120 }) => {
        const radius = (size - 8) / 2;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        const getGradientColor = (percent) => {
            if (percent >= 80) return ['#34d399', '#059669'];
            if (percent >= 60) return ['#fbbf24', '#f97316'];
            if (percent >= 40) return ['#fb923c', '#ef4444'];
            return ['#f87171', '#dc2626'];
        };
        const [startColor, endColor] = getGradientColor(percentage);




        return (

            <div className="relative flex items-center justify-center">
                <svg width={size} height={size} className="transform rotate-90">
                    <defs>
                        <linearGradient id="progressGradient" x1="0" y1="0" x2="100" y2="0%">
                            <stop offset="0" stopColor={startColor} />
                            <stop offset="100" stopColor={endColor} />
                        </linearGradient>
                    </defs>

                    {/* Background circle - light gray */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                    />

                    {/* Progress circle with dynamic gradient */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="url(#progressGradient)"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                            transition: 'stroke-dashoffset 1000ms ease-out'
                        }}
                    />
                </svg>

                {/* Percentage text - color matches gradient start */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold" style={{ color: startColor }}>
                        {Math.round(percentage)}
                    </span>
                </div>
            </div>
        );
    };




    const getBorderGradient = (percent) => {
        if (percent >= 80) return 'from-green-400 via-green-500 to-green-600';
        if (percent >= 60) return 'from-yellow-400 via-orange-400 to-orange-500';
        if (percent >= 40) return 'from-orange-400 via-red-400 to-red-500';
        return 'from-red-400 via-red-500 to-red-600';
    };

    return (
        <RouteGuard>
            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-20 bg-blue-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                    <div className="flex flex-col items-center py-6 space-y-8">
                        {/* Logo */}
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            </div>
                        </div>
                        {/* Navigation */}
                        <Navbar />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-20">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <Menu className="w-5 h-5" />
                                </Button>

                                {/* Search */}
                                <div className="relative w-96">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search"
                                        className="pl-10 bg-gray-50 border-gray-200"
                                    />
                                </div>
                            </div>

                            {/* User Profile */}
                            <div className="flex items-center space-x-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setLogoutIsOpen(!isLogoutOpen)}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >

                                        <span className="text-sm font-medium text-gray-900">{user ? `${user.name}` : 'Welcome!'}</span>
                                        {isLogoutOpen ? (
                                            <ChevronUp className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-gray-500" />
                                        )}
                                    </button>

                                    {isLogoutOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Dashboard */}
                    <main className="p-4">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center justify-between  text-gray-700">
                                    <h1 className="text-sm font-bold text-gray-400">Candidates</h1>
                                    <ChevronRight className="w-6 h-6 text-blue-950" />
                                    <span className=" text-lg font-bold text-blue-950">John Doe</span>
                                </div>
                                <div>
                                    <Button className="flex items-center bg-gray-100 text-black">
                                        <div className="w-6 h-6 border bg-white border-white rounded-full flex items-center justify-center mr-2">
                                            <ArrowLeft className="w-4 h-4" />
                                        </div>
                                        Go Back
                                    </Button>
                                </div>

                            </div>
                        </div>



                        <div className="flex gap-6">
                            {/* Left Content */}
                            <div className="flex-1">
                                <div className="bg-white border rounded-lg shadow-sm p-6">
                                    <div className="flex flex-col lg:flex-row gap-8">
                                        {/* Left Column - Candidate Profile */}
                                        <div className="w-full lg:w-3/4">


                                            {/* Candidate Header */}
                                            <div className="flex items-start mt-4 gap-4">
                                                <Avatar className="h-16 w-16 ring-2 ring-gray-100">
                                                    <AvatarImage src="/avatars/candidate.png" alt="Candidate" />
                                                    <AvatarFallback className="text-lg font-medium bg-blue-50 text-blue-600">JS</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className='flex gap-2'><h4 className="text-lg font-semibold text-blue-950 truncate">Jane Smith</h4>
                                                        <span className="inline-flex items-center text-xs px-12 py-1 rounded-md bg-blue-100 text-blue-950 font-medium hover:bg-green-100 focus:outline-none">
                                                            Interview
                                                        </span>
                                                    </div>
                                                    <div className='flex gap-2 mt-2'>
                                                        <p className="text-sm text-gray-600 truncate">jane.smith@email.com</p>
                                                        <p className="text-sm text-gray-600 truncate">+25512355389</p></div>

                                                </div>

                                            </div>


                                            {/* Contact Information */}
                                            <div className="space-y-4 ml-2">
                                                <div className="flex items-center gap-8 mt-2 text-xs text-gray-500">

                                                    <div
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-600 hover:decoration-blue-700 px-3 py-1 text-sm"
                                                    >
                                                        Edit
                                                    </div>
                                                    <Image
                                                        src="/images/linkedin.png"
                                                        alt="linkdein"
                                                        width={20}
                                                        height={20}
                                                        className="object-contain"
                                                    />
                                                    <Image
                                                        src="/images/twitter.png"
                                                        alt="linkdein"
                                                        width={20}
                                                        height={20}
                                                        className="object-contain"
                                                    />
                                                    <Image
                                                        src="/images/webs.png"
                                                        alt="linkdein"
                                                        width={20}
                                                        height={20}
                                                        className="object-contain"
                                                    />


                                                </div>
                                            </div>

                                        </div>
                                        <div className="hidden lg:block w-px bg-gray-300 self-stretch -ml-2"></div>


                                        {/* Status Cards */}
                                        <div className="w-full lg:w-1/4">
                                            {/* Current Round */}
                                            <div className=" p-4 mr-8">
                                                <div className="w-[278px] items-center gap-3">
                                                    <h4 className="text-xl font-semibold mb-2 text-gray-900">Current Status</h4>
                                                    <div className="flex justify-between mb-2 gap-2">
                                                        <p className="text-sm font-medium text-gray-900">Round</p>
                                                        <p className="inline-flex items-center text-xs px-12 py-1 rounded-md bg-blue-100 text-blue-950 font-medium focus:outline-none">Technical</p>
                                                    </div>
                                                    <div className="flex justify-between gap-2">
                                                        <p className="text-sm font-medium text-gray-500">Assigned To:</p>
                                                        <div className="flex items-center bg-candidate-names  gap-2   text-xs px-7 py-1 rounded-md  text-blue-950 font-medium hover:bg-green-100 focus:outline-none">
                                                            <Avatar className="h-4.5 w-4.5   ">
                                                                <AvatarImage src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2" alt="John Doe" />
                                                                <AvatarFallback className="text-sm font-medium w-16 rounded-b-sm bg-gray-100 text-gray-600">JD</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex gap-2">
                                                                <p className="text-sm text-blue-950">John Doe</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-items-end gap-10">
                                                        <p className="text-sm font-medium text-blue-950">Interview Date</p>
                                                        <p className="text-sm  text-blue-950">May 10, 2024</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Require Attention Section */}

                                <div className="p-6 bg-gray-50 min-h-screen">
                                    <div className="flex gap-6 ">
                                        {/* Left Side - 2/3 width */}
                                        <div className="flex-1 w-2/3">
                                            <Card className="bg-white shadow-lg border-0">
                                                <CardContent className="p-6">
                                                    <Tabs defaultValue="jobs" className="w-full">
                                                        <TabsList className="grid grid-cols-7 mb-6 bg-transparent p-0 rounded-none border-b border-gray-200">
                                                            <TabsTrigger
                                                                value="jobs"
                                                                className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                            >
                                                                General
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="evaluation"
                                                                className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                            >
                                                                Evaluation
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="experience"
                                                                className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                            >
                                                                Experience
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="education"
                                                                className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                            >
                                                                Education
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="events"
                                                                className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                            >
                                                                Events
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="documents"
                                                                className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                            >
                                                                Documents
                                                            </TabsTrigger>
                                                            <TabsTrigger
                                                                value="messages"
                                                                className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                            >
                                                                Messages
                                                            </TabsTrigger>
                                                        </TabsList>
                                                        <TabsContent value="jobs">
                                                            <div className="space-y-8">
                                                                {/* Files Section */}
                                                                <div>
                                                                    <div className="flex items-center mb-6">
                                                                        <h3 className="text-xl font-semibold flex items-center gap-3 text-gray-800">
                                                                            Candidate Files
                                                                        </h3>
                                                                        <div
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-600 hover:decoration-blue-700 px-3 py-1 text-sm"

                                                                        >
                                                                            Edit
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                                        {[
                                                                            {
                                                                                name: "Resume.pdf",
                                                                                date: "2d ago",
                                                                                icon: <FileText className="w-5 h-5 text-blue-500" />,
                                                                                size: "2.3 MB"
                                                                            },
                                                                            {
                                                                                name: "Cover_Letter.docx",
                                                                                date: "2d ago",
                                                                                icon: <FileArchive className="w-5 h-5 text-green-500" />,
                                                                                size: "1.1 MB"
                                                                            },
                                                                            {
                                                                                name: "Certifications.zip",
                                                                                date: "2d ago",
                                                                                icon: <FileArchive className="w-5 h-5 text-orange-500" />,
                                                                                size: "5.7 MB"
                                                                            },
                                                                            {
                                                                                name: "Certifications.zip",
                                                                                date: "2d ago",
                                                                                icon: <FileArchive className="w-5 h-5 text-orange-500" />,
                                                                                size: "5.7 MB"
                                                                            }
                                                                        ].map((file, index) => (
                                                                            <Card
                                                                                key={index}
                                                                                className="p-2 hover:shadow-sm transition-all duration-200 border border-gray-200 hover:border-gray-300 w-full max-w-xs"
                                                                            >
                                                                                <div className="flex items-center gap-1.5">
                                                                                    <div className="p-1.5 bg-gray-50 rounded-md flex-shrink-0">
                                                                                        {file.icon}
                                                                                    </div>
                                                                                    <div className="flex gap-2 min-w-0 overflow-hidden">
                                                                                        <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                                                                                        <div className="flex items-center gap-1 text-[0.65rem] text-gray-500 truncate">
                                                                                            <span>{file.date}</span>
                                                                                            <span>•</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </Card>
                                                                        ))}

                                                                    </div>
                                                                    <div className="flex justify-end">
                                                                        <div
                                                                            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-600 hover:decoration-blue-700 px-3 py-2 text-sm"
                                                                        >
                                                                            View All
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Experience Section */}
                                                                <div>
                                                                    <div className="flex items-center mb-6">
                                                                        <h3 className="text-xl font-semibold flex items-center gap-3 text-gray-800">
                                                                            Last Experience
                                                                        </h3>
                                                                        <div
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-600 hover:decoration-blue-700 px-3 py-1 text-sm"

                                                                        >
                                                                            Edit
                                                                        </div>
                                                                    </div>


                                                                    <div className="space-y-4">
                                                                        {[
                                                                            {
                                                                                company: "TechCorp",
                                                                                position: "Senior Developer",
                                                                                period: "2020 - Present",
                                                                                description: "Led frontend team of 5 developers, implemented React architecture, increased performance by 40%",
                                                                                responsibilities: [
                                                                                    "Architected and developed scalable RESTful APIs that supported integration with internal microservices and third-party systems, resulting in a 25% decrease in inter-service latency.",
                                                                                    "Conducted comprehensive performance tuning on PostgreSQL queries and indexing strategies, reducing average response times across key endpoints by 30%.",
                                                                                    "Led and mentored a cross-functional team of 3 mid-level developers and 2 interns, introducing code review practices and improving sprint delivery consistency by 40%.",
                                                                                ],
                                                                            },
                                                                            {
                                                                                company: "WebSolutions",
                                                                                position: "Frontend Developer",
                                                                                period: "May 2018 - April 2020",
                                                                                description: "Developed customer portals using Vue.js, collaborated with UX team on 15+ projects",
                                                                                responsibilities: [
                                                                                    "Built dynamic and responsive web interfaces using Vue.js, enhancing user satisfaction scores and supporting over 10,000 monthly active users.",
                                                                                    "Collaborated closely with the UX and backend teams to design user-centered features, reducing the bounce rate on client dashboards by 18%.",
                                                                                    "Optimized frontend build processes with Webpack and Babel, reducing production bundle size by 35% and improving initial load times significantly.",
                                                                                ],
                                                                            },
                                                                            {
                                                                                company: "StartUp Inc",
                                                                                position: "Junior Developer",
                                                                                period: "JJanuary 2016 - September2018",
                                                                                description: "Built MVP for SaaS product, gained experience in full-stack development",
                                                                                responsibilities: [
                                                                                    "Assisted in the development of the MVP using Node.js and React, which was successfully launched and attracted the company’s first round of seed funding.",
                                                                                    "Wrote modular backend components and participated in unit testing efforts, ensuring code reliability and maintainability in a fast-paced startup environment.",
                                                                                    "Contributed to UI styling and mobile responsiveness, collaborating with design leads to ensure a cohesive cross-platform experience.",
                                                                                ],
                                                                            },
                                                                        ].map((exp, index) => (
                                                                            <div key={index} className="p-5">
                                                                                <div className="flex justify-between items-start mb-3">
                                                                                    <div>
                                                                                        <div className="flex">
                                                                                            <div>
                                                                                                <div className="h-14 w-2 mr-2 mt-2 rounded-lg bg-gray-200"></div>
                                                                                            </div>

                                                                                            <div>
                                                                                                <h4 className="font-medium text-gray-700 text-lg">{exp.position}</h4>
                                                                                                <div className="flex mt-2 space-x-2">
                                                                                                    <p className="text-gray-700  font-medium">{exp.company}</p>
                                                                                                    <p className="text-sm  text-gray-500">({exp.period})</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='ml-4'>
                                                                                    <p className="text-gray-700 font-medium mb-2">Responsible for:</p>
                                                                                    <ol className="list-decimal ml-2 list-inside text-gray-500 space-y-1">
                                                                                        {exp.responsibilities?.map((item, i) => (
                                                                                            <li key={i}>{item}</li>
                                                                                        ))}
                                                                                    </ol>
                                                                                </div>
                                                                            </div>

                                                                        ))}

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="evaluation">
                                                            <div className="text-center py-12 text-gray-500">
                                                                <div className="text-lg mb-2">Evaluation Content</div>
                                                                <p>Detailed evaluation metrics will be displayed here</p>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="experience">
                                                            <div className="text-center py-12 text-gray-500">
                                                                <div className="text-lg mb-2">Experience Details</div>
                                                                <p>Comprehensive experience analysis will be shown here</p>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="education">
                                                            <div className="text-center py-12 text-gray-500">
                                                                <div className="text-lg mb-2">Education Background</div>
                                                                <p>Educational qualifications and achievements will be displayed here</p>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="events">
                                                            <div className="text-center py-12 text-gray-500">
                                                                <div className="text-lg mb-2">Events & Activities</div>
                                                                <p>Timeline of events and activities will be shown here</p>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="documents">
                                                            <div className="text-center py-12 text-gray-500">
                                                                <div className="text-lg mb-2">Document Library</div>
                                                                <p>All candidate documents will be organized here</p>
                                                            </div>
                                                        </TabsContent>

                                                        <TabsContent value="messages">
                                                            <div className="text-center py-12 text-gray-500">
                                                                <div className="text-lg mb-2">Message History</div>
                                                                <p>Communication log and messages will be displayed here</p>
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Right Side - 1/3 width */}
                                        <div className="w-7/24 ">
                                            <Card className="bg-gray-50">
                                                <CardContent className="space-y-6">
                                                    {/* Score Summary */}
                                                    <div className="flex flex-col items-center justify-center border rounded-2xl border-gray-200 mt-10 bg-white p-4 space-y-3 w-64 mx-auto">
                                                        <CircularProgress percentage={percentage} size={80} />

                                                        <div className="flex flex-col items-center mt-2">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-lg font-semibold text-gray-900">Score:</span>
                                                                <span className="text-lg font-semibold text-green-600">
                                                                    {percentage >= 80
                                                                        ? "Potential Fit"
                                                                        : percentage >= 60
                                                                            ? "Strong"
                                                                            : percentage >= 40
                                                                                ? "Moderate"
                                                                                : "Potential"}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-blue-600 hover:decoration-blue-700 px-3 py-1 text-sm"

                                                        >
                                                            Edit
                                                        </div>
                                                    </div>

                                                    {/* Requirements Checklist */}
                                                    <div className="space-y-3">
                                                        {requirements.map((requirement) => (
                                                            <div
                                                                key={requirement.id}
                                                                className="flex items-center justify-between py-2 px-4 bg-gray-50 hover:bg-gray-50 transition-all"
                                                            >
                                                                <span className="text-sm text-gray-700 font-medium">
                                                                    {requirement.name}
                                                                </span>
                                                                <Image
                                                                    src={requirement.met ? tick : cross}
                                                                    alt={requirement.met ? "tick" : "cross"}
                                                                    width={16}
                                                                    height={16}
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </div>
        </RouteGuard>

    );
}
