"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, CircleUser, Clock, Twitter } from 'lucide-react';

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
        { name: 'Home', icon: Home, current: true },
        { name: 'Jobs', icon: Briefcase, current: false },
        { name: 'Candidates', icon: Users, current: false },
        { name: 'Reports', icon: FileText, current: false },
        { name: 'Calendar', icon: Calendar, current: false },
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
                        {Math.round(percentage)}%
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
                    <nav className="flex flex-col space-y-6">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href="#"
                                className={`p-3 rounded-lg transition-colors group relative ${item.current
                                    ? 'bg-blue-800 text-white'
                                    : 'text-blue-300 hover:bg-blue-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs">{item.name}</span>
                            </a>
                        ))}
                    </nav>
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
                            <span className="text-sm font-medium text-gray-900">Jane Doe</span>
                        </div>
                    </div>
                </header>

                {/* Main Dashboard */}
                <main className="p-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 text-gray-700">
                                <h1 className="text-sm font-bold text-gray-500">Candidates</h1>
                                <svg class="rtl:rotate-180  w-3 h-3 mx-1 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="text-black">John Doe</span>
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
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                    {/* Left Column - Candidate Profile */}
                                    <div className="lg:col-span-3">


                                        {/* Candidate Header */}
                                        <div className="flex items-start mt-4 gap-4">
                                            <Avatar className="h-16 w-16 ring-2 ring-gray-100">
                                                <AvatarImage src="/avatars/candidate.png" alt="Candidate" />
                                                <AvatarFallback className="text-lg font-medium bg-blue-50 text-blue-600">JS</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className='flex gap-2'><h4 className="text-lg font-semibold text-gray-900 truncate">Jane Smith</h4>
                                                    <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                                                        Interview
                                                    </span>
                                                </div>
                                                <div className='flex gap-2 mt-1'><p className="text-sm text-gray-600 truncate">jane.smith@email.com</p>
                                                    <p className="text-sm text-gray-600 truncate">+25512355389</p></div>

                                            </div>

                                        </div>

                                        {/* Contact Information */}
                                        <div className="space-y-4 ml-2">
                                            <div className="flex items-center gap-6 mt-2 text-xs text-gray-500">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                                                    Edit
                                                </span>
                                                <Mail className="w-5 h-5 text-blue-600" />
                                                <Twitter className="w-5 h-5 text-blue-600" />
                                                <Linkedin className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </div>

                                    </div>



                                    {/* Status Cards */}
                                    <div className="lg:col-span-1">
                                        {/* Current Round */}
                                        <div className=" p-4">
                                            <div className="items-center gap-3">
                                                <h4 className="text-xl font-semibold mb-2 text-gray-900">Current Status</h4>
                                                <div className="flex mb-2 gap-2">
                                                    <p className="text-sm font-medium text-gray-900">Round</p>
                                                    <p className=" rounded-b-sm text-xs px-2 py-1 rounded-full bg-green-50  font-medium text-blue-600">Technical</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <p className="text-sm font-medium text-gray-900">Assigned To:</p>
                                                    <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                                                        <AvatarImage src="/avatars/john-doe.png" alt="John Doe" />
                                                        <AvatarFallback className="text-sm font-medium bg-gray-100 text-gray-600">JD</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex gap-2">
                                                        <p className="text-sm text-gray-600">John Doe</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <p className="text-sm font-medium text-gray-900">Interview Date</p>
                                                    <p className="text-sm text-gray-600">May 10, 2024</p>
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
                                    <div className="flex-1 w-3/4">
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
                                                                    <Button variant="outline" size="sm" className="hover:bg-blue-50 ml-2 hover:border-blue-300">
                                                                        Edit
                                                                    </Button>
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
                                                            </div>

                                                            {/* Experience Section */}
                                                            <div>
                                                                <div className="flex items-center mb-6">
                                                                    <h3 className="text-xl font-semibold flex items-center gap-3 text-gray-800">
                                                                        Last Experience
                                                                    </h3>
                                                                    <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-300">Edit
                                                                    </Button>
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
                                    <div className="w-1/4">
                                        <Card className={`relative overflow-hidden bg-gradient-to-br  border-gray-200 p-0.5 shadow-lg`}>
                                            <div className="bg-gray-200 rounded-lg h-full">

                                                <CardContent className="space-y-6">
                                                    <div className="flex flex-col items-center justify-center border border-gray-200 bg-white rounded-lg p-3 space-y-3 w-64 mx-auto my-4">
                                                        {/* Progress circle - make it smaller by passing size prop */}
                                                        <CircularProgress percentage={percentage} size={80} />
                                                        <div className="flex flex-col items-center space-y-0.5">
                                                            <div className="flex items-center space-x-1.5">
                                                                <span className="text-sm font-medium text-gray-700">Score:</span>
                                                                <span className="text-sm font-semibold text-gray-900">
                                                                    {percentage >= 80 ? "Excellent" :
                                                                        percentage >= 60 ? "Strong" :
                                                                            percentage >= 40 ? "Moderate" : "Potential"}
                                                                </span>
                                                            </div>

                                                        </div>

                                                        {/* More compact button */}
                                                        <Button
                                                            variant="outline"
                                                            size="sm" /* Small button */
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 text-sm"
                                                        >
                                                            Edit
                                                        </Button>
                                                    </div>

                                                    {/* Requirements List */}
                                                    <div className="space-y-3">
                                                        {requirements.map((requirement) => (
                                                            <div key={requirement.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                                                                <span className="text-gray-700 font-medium">{requirement.name}</span>
                                                                {requirement.met ? (
                                                                    <CheckCircle2 className="h-5 w-5 text-green-500 " />
                                                                    
                                                                ) : (
                                                                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>


                                                </CardContent>
                                            </div>
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
    );
}
