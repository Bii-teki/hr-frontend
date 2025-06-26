"use client"
import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import jobkit from "../../../public/images/jobs.png"
import Navbar from '../components/navbar';
import { useAuth } from '../context/AuthContext';
import { RouteGuard } from '../../app/utils/RouteGuard';
import CandidateModal from '../components/addcandidate';
import JobsModal from '../components/addjob';
import toast, { Toaster } from 'react-hot-toast';

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
    X, ChevronDown, ChevronUp, LogOut
} from 'lucide-react';


export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout, add_candidate, user, add_job } = useAuth();
    const [isLogoutOpen, setLogoutIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const overviewCards = [
        {
            number: '33',
            title: 'Interview',
            subtitle: 'Scheduled',
            icon: (props) => <Image src="/images/Illustrations.png" width={96} height={96}  alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
        {
            number: '2',
            title: 'Interview Feedback',
            subtitle: 'Pending',
            icon: (props) => <Image src="/images/feedback.png" width={96} height={96} alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
        {
            number: '44',
            title: 'Approval',
            subtitle: 'Pending',
            icon: (props) => <Image src="/images/approval.png" width={96} height={96} alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
        {
            number: '13',
            title: 'Offer Acceptance',
            subtitle: 'Pending',
            icon: (props) => <Image src="/images/acceptance.png" width={96} height={96} alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
        {
            number: '17',
            title: 'Documentations',
            subtitle: 'Pending',
            icon: (props) => <Image src="/images/documentations.png" width={96} height={96} alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
        {
            number: '3',
            title: 'Training',
            subtitle: 'Pending',
            icon: (props) => <Image src="/images/training.png" width={96} height={96} alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
        {
            number: '5',
            title: 'Supervisor Allocation',
            subtitle: 'Pending',
            icon: (props) => <Image src="/images/allocations.png" width={96} height={96} alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
        {
            number: '56',
            title: 'Project Allocation',
            subtitle: 'Pending',
            icon: (props) => <Image src="/images/project-allocation.png" width={96} height={96} alt="Candidates" {...props} />,
            bgColor: 'bg-white',
        },
    ];

    const jobPositions = [
        {
            title: 'Senior Data Analyst',
            daysAgo: '100 days ago',
            positionsLeft: 3,
            applications: 123,
            interviewed: 40,
            rejected: 33,
            feedbackPending: 7,
            offered: 2,
           
        },
        {
            title: 'Junior Data Analyst',
            daysAgo: '78 days ago',
            positionsLeft: 7,
            applications: 567,
            interviewed: 22,
            rejected: 20,
            feedbackPending: 2,
            offered: 4
        },
        {
            title: 'Product Designer',
            daysAgo: '55 days ago',
            positionsLeft: 2,
            applications: 201,
            interviewed: 32,
            rejected: 18,
            feedbackPending: 14,
            offered: 0
        },
        {
            title: 'Java Developer',
            daysAgo: '45 days ago',
            positionsLeft: 5,
            applications: 231,
            interviewed: 23,
            rejected: 10,
            feedbackPending: 13,
            offered: 3,
        },
        {
            title: 'Product Manager',
            daysAgo: '13 days ago',
            positionsLeft: 3,
            applications: 67,
            interviewed: 41,
            rejected: 22,
            feedbackPending: 19,
            offered: 1,
        },
    ];
    const candidates = [
        {
            title: "Jane Muthoni",
            daysAgo: "2 days ago",
            positionsLeft: "12 May 2024",
            applications: "Complete",
            interviewed: "7/10",
            rejected: "Mark Kiptoo",
            allocated: true,
            icon: (props) => <Image src="/images/candidates.png" width={64} height={64} alt="Candidates" {...props} />,
        },
        {
            title: "Elijah Kirui",
            daysAgo: "5 days ago",
            positionsLeft: "8 May 2024",
            applications: "In Progress",
            interviewed: "4/10",
            rejected: "Not Allocated",
            allocated: false,
            icon: (props) => <Image src="/images/candidates.png" width={64} height={64} alt="Candidates" {...props} />,
        },
        {
            title: "Faith Njoki",
            daysAgo: "Today",
            positionsLeft: "20 June 2024",
            applications: "Complete",
            interviewed: "10/10",
            rejected: "Kevin Maina",
            allocated: true,
            icon: (props) => <Image src="/images/candidates.png" width={64} height={64} alt="Candidates" {...props} />,
        },
    ];


    const upcomingMeetings = [
        {
            time: '3:15',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: '10:00',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: '10:00',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'closed',
        },
        {
            time: '10:00',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
    ];
    const upcomingTomorrowMeetings = [
        {
            time: '3:15',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: '10:00',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: '10:00',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'closed',
        },
        {
            time: '10:00',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
    ];
    const upcomingWeekMeetings = [
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'closed',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'closed',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'closed',
        },
        {
            time: 'Sep 3',
            title: 'Mini Soman: Mean stack developer, 4th phase interview',
            duration: '3:15 - 3:45',
            type: 'Today',
            status: 'opened',
        },
    ];




    const handleLogout = () => {
        logout();
    };

    const handleSubmit = async (formData) => {
        try {
            console.log('Submitting:', formData);
            const result = await add_candidate(formData);

            if (!result.success) {
                throw new Error(result.error);
            }
            toast.dismiss(loadingToast);
            toast.success('Job posted successfully!');

            return result.data;
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Submission failed:', error);
            toast.error(error.message || 'Job posting failed');
            throw error; 
        }
    };
    const handleJobSubmit = async (formData) => {
        const loadingToast = toast.loading('Saving job posting...');

        try {
            console.log('Submitting:', formData);
            const result = await add_job(formData);

            if (!result.success) {
                throw new Error(result.error);
            }

            toast.dismiss(loadingToast);
            toast.success('Job posted successfully!');

            return result.data;
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Submission failed:', error);
            toast.error(error.message || 'Job posting failed');
            throw error; 
        }
    };
    return (
        <RouteGuard>
            <div className="min-h-screen z-10 bg-gray-50 flex">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-20 bg-blue-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                    <div className="flex flex-col items-center py-6 space-y-8">
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
                    <main className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                            <div className="flex relative space-x-3">
                                <Button

                                    onClick={() => setIsOpen(true)}
                                    className="bg-blue-600 hover:bg-blue-700">
                                    <div className='w-6 h-6 border border-white rounded-full flex items-center justify-center mr-2'>
                                        <Plus className="w-4 h-4 text-white" />
                                    </div>
                                    Add Candidate
                                </Button>
                                <CandidateModal
                                    isOpen={isOpen}
                                    onClose={() => setIsOpen(false)}
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        phone: '',
                                        qualifications: [''],
                                        experience: '',
                                        status: 'Applied',
                                        currentPosition: '',
                                        currentCompany: '',
                                        jobPreferences: [''],
                                        appliedJob: '507f1f77bcf86cd799439011'
                                    }}
                                    onSubmit={handleSubmit}
                                />
                                <Button className="bg-blue-600 hover:bg-blue-700"
                                    onClick={() => setIsJobModalOpen(true)}
                                >
                                    <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center mr-2">
                                        <Plus className="w-4 h-4 text-white" />
                                    </div>

                                    Add Job
                                </Button>
                                <JobsModal
                                    isOpen={isJobModalOpen}
                                    onClose={() => setIsJobModalOpen(false)}
                                    initialValues={{
                                        title: '',
                                        description: '',
                                        requirements: [''],
                                        employmentType: 'Full-time',
                                        responsibilities: [''],
                                        department: '',
                                        location: '',
                                        experienceLevel: 'Senior',
                                        salaryRange: {
                                            min: 0,
                                            max: 0,
                                        },
                                        deadline: '',
                                        isActive: true
                                    }}
                                    onSubmit={handleJobSubmit}
                                />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            {/* Left Content */}
                            <div className="flex-1">
                                {/* Overview Cards */}
                                <div className="grid grid-cols-4 gap-8 mb-8">
                                    {overviewCards.map((card, index) => {
                                        const IconComponent = card.icon;
                                        return (
                                            <div
                                                key={index} className="mb-8"
                                            >
                                                <div className="relative border-2 bg-blue-50 border-gray-200 rounded-lg p-6">
                                                    {/* Circular badge */}
                                                    <div className="absolute -top-5 -left-5 w-16 h-18 border border-black rounded-[20px] bg-white flex items-center justify-center text-black text-2xl font-bold shadow-lg z-10">
                                                        {card.number}
                                                    </div>

                                                    {/* Icon and spacing */}
                                                    <div className="flex items-center justify-between mb-4 pt-2 pl-6">
                                                        <div className="text-3xl font-bold text-gray-900"></div>
                                                        {typeof IconComponent === 'function' ? (
                                                            <IconComponent className="w-24 h-24 object-contain" />
                                                        ) : (
                                                            <span className="text-3xl">{IconComponent}</span>
                                                        )}
                                                       
                                                    </div>

                                                    {/* Title and subtitle */}
                                                    <div className="pl-6">
                                                        <div className="font-medium text-gray-900 mb-1">{card.title}</div>
                                                        <div className="text-sm text-gray-500">{card.subtitle}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Require Attention Section */}
                                <Card className="bg-gray">
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">Require Attention</h2>

                                        <Tabs defaultValue="jobs" className="w-full">
                                            <TabsList className="grid  grid-cols-3 mb-6">
                                                <TabsTrigger
                                                    value="jobs"
                                                    className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                >
                                                    Jobs
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="candidates"
                                                    className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                >
                                                    Candidates
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="onboardings"
                                                    className="relative bg-transparent border-0 rounded-none pb-3 px-4 text-gray-500 hover:text-gray-700 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-yellow-400 data-[state=active]:after:content-[''] transition-all duration-200 font-medium"
                                                >
                                                    Onboardings
                                                </TabsTrigger>

                                            </TabsList>

                                            <TabsContent value="jobs">
                                                <div className="overflow-x-auto">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="border-b border-gray-200">
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600"></th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Positions Left</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Applications</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Interviewed</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Rejected</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Feedback Pending</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Offered</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {jobPositions.map((job, index) => (
                                                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                                    <td className="py-4 px-4">
                                                                        <div className="flex items-center space-x-3">
                                                                            <Avatar className="w-8 h-8 bg-gray-200">
                                                                                <AvatarFallback>
                                                                                    <Image
                                                                                        src={jobkit}
                                                                                        alt={job.title}
                                                                                        width={64}
                                                                                        height={64}
                                                                                        className="object-contain"
                                                                                    />
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <div>
                                                                                <div className="font-medium text-gray-900">{job.title}</div>
                                                                                <div className="text-sm text-gray-500">{job.daysAgo}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4 px-4 text-center text-gray-900 font-medium">{job.positionsLeft}</td>
                                                                    <td className="py-4 px-4 text-center text-gray-500">{job.applications}</td>
                                                                    <td className="py-4 px-4 text-center text-gray-500">{job.interviewed}</td>
                                                                    <td className="py-4 px-4 text-center text-gray-500">{job.rejected}</td>
                                                                    <td className="py-4 px-4 text-center text-gray-500">{job.feedbackPending}</td>
                                                                    <td className="py-4 px-4 text-center text-gray-900 font-medium">{job.offered}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="candidates">
                                                <div className="overflow-x-auto">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="border-b border-gray-200">
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600"></th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Onboarded</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Training</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Documentations</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Supervisor</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {candidates.map((job, index) => (
                                                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                                    {/* Name + Avatar */}
                                                                    <td className="py-4 px-4">
                                                                        <div className="flex items-center space-x-3">
                                                                            <Avatar className="w-8 h-8 bg-gray-200">
                                                                                <AvatarFallback>
                                                                                    <User className="w-4 h-4" />
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <div>
                                                                                <div className="font-medium text-gray-900">{job.title}</div>
                                                                                <div className="text-sm text-gray-500">{job.daysAgo}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    {/* Onboarded */}
                                                                    <td className="py-4 px-4 text-center font-medium">{job.positionsLeft}</td>

                                                                    {/* Training */}
                                                                    <td className="py-4 px-4 text-center">{job.applications}</td>

                                                                    {/* Documentations */}
                                                                    <td className="py-4 px-4 text-center">{job.interviewed}</td>

                                                                    {/* Supervisor */}
                                                                    <td className="py-4 px-4 text-center">
                                                                        {job.allocated ? (
                                                                            <div className="flex items-center justify-center space-x-2">
                                                                                <Avatar className="w-6 h-6 bg-gray-100">
                                                                                    <AvatarFallback>
                                                                                        <User className="w-3 h-3" />
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span className="text-sm font-medium text-gray-800">{job.rejected}</span>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="text-red-600 font-medium text-sm">Not Allocated</span>
                                                                        )}
                                                                    </td>

                                                                    {/* Project */}
                                                                    <td className="py-4 px-4 text-center">
                                                                        {job.allocated ? (
                                                                            <span className="text-green-600 font-medium text-sm">Assigned</span>
                                                                        ) : (
                                                                            <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs inline-block">Not Allocated</div>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="onboardings">
                                                <div className="overflow-x-auto">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="border-b border-gray-200">
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600"></th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Onboarded</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Training</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Documentations</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Supervisor</th>
                                                                <th className="text-left py-3 px-4 font-medium text-gray-600">Project</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {candidates.map((job, index) => (
                                                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                                                    {/* Name + Avatar */}
                                                                    <td className="py-4 px-4">
                                                                        <div className="flex items-center space-x-3">
                                                                            <Avatar className="w-8 h-8 bg-gray-200">
                                                                                <AvatarFallback>
                                                                                    <User className="w-4 h-4" />
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <div>
                                                                                <div className="font-medium text-gray-900">{job.title}</div>
                                                                                <div className="text-sm text-gray-500">{job.daysAgo}</div>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    {/* Onboarded */}
                                                                    <td className="py-4 px-4 text-center font-medium">{job.positionsLeft}</td>

                                                                    {/* Training */}
                                                                    <td className="py-4 px-4 text-center">{job.applications}</td>

                                                                    {/* Documentations */}
                                                                    <td className="py-4 px-4 text-center">{job.interviewed}</td>

                                                                    {/* Supervisor */}
                                                                    <td className="py-4 px-4 text-center">
                                                                        {job.allocated ? (
                                                                            <div className="flex items-center justify-center space-x-2">
                                                                                <Avatar className="w-6 h-6 bg-gray-100">
                                                                                    <AvatarFallback>
                                                                                        <User className="w-3 h-3" />
                                                                                    </AvatarFallback>
                                                                                </Avatar>
                                                                                <span className="text-sm font-medium text-gray-800">{job.rejected}</span>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="text-red-600 bg-red-300 rounded-2xl  font-medium text-sm">Not Allocated</span>
                                                                        )}
                                                                    </td>

                                                                    {/* Project */}
                                                                    <td className="py-4 px-4 text-center">
                                                                        {job.allocated ? (
                                                                            <span className="text-green-600 font-medium text-sm">Assigned</span>
                                                                        ) : (
                                                                            <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs inline-block">Not Allocated</div>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </CardContent>
                                </Card>
                            </div>


                            {/* Right Sidebar - Upcoming Meetings */}
                            <div className="w-[27%]">
                                <Card className="bg-white">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
                                            <div className='w-6 h-6 border border-blue-200 rounded-full flex items-center justify-center mr-2'>
                                                <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-600 mb-3">Today</h4>
                                                <div className=" space-y-3">
                                                    {upcomingMeetings.slice(0, 4).map((meeting, index) => {
                                                        const isClosed = meeting.status === 'closed';
                                                        const textColor = isClosed ? 'text-lime-900' : 'text-blue-600';

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`flex border-r-6 rounded-xl space-x-3 w-full items-stretch max-w-md shadow-sm ${isClosed ? 'bg-green-100' : 'bg-blue-50'
                                                                    }`}
                                                            >
                                                                <div className={`${textColor} font-bold min-w-[50px] flex items-center justify-center px-1 py-1`}>
                                                                    {meeting.time}
                                                                </div>
                                                                <div className="w-px bg-blue-300 self-stretch"></div>
                                                                <div className="flex-1 min-w-0 px-1 py-1">
                                                                    <p className={`text-xs font-medium truncate ${textColor}`}>{meeting.title}</p>
                                                                    <p className={`text-[11px] ${textColor}`}>{meeting.duration}</p>
                                                                </div>
                                                                <div className="w-px bg-blue-300 self-stretch" />
                                                            </div>
                                                        );
                                                    })}


                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-600 mb-3">Tomorrow</h4>
                                                <div className="space-y-3">
                                                    {upcomingTomorrowMeetings.slice(0, 4).map((meeting, index) => {
                                                        const isClosed = meeting.status === 'closed';
                                                        const textColor = isClosed ? 'text-lime-900' : 'text-blue-600';

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`flex border-r-6 rounded-xl space-x-3 w-full items-stretch max-w-md shadow-sm ${isClosed ? 'bg-green-100' : 'bg-blue-50'
                                                                    }`}
                                                            >
                                                                <div className={`${textColor} font-bold min-w-[50px] flex items-center justify-center px-1 py-1`}>
                                                                    {meeting.time}
                                                                </div>
                                                                <div className="w-px bg-blue-300 self-stretch"></div>
                                                                <div className="flex-1 min-w-0 px-1 py-1">
                                                                    <p className={`text-xs font-medium truncate ${textColor}`}>{meeting.title}</p>
                                                                    <p className={`text-[11px] ${textColor}`}>{meeting.duration}</p>
                                                                </div>
                                                                <div className="w-px bg-blue-300 self-stretch" />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-gray-600 mb-3">This Week</h4>
                                                <div className="space-y-3">
                                                    {upcomingWeekMeetings.slice(0, 16).map((meeting, index) => {
                                                        const isClosed = meeting.status === 'closed';
                                                        const textColor = isClosed ? 'text-lime-900' : 'text-blue-600';

                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`flex border-r-6 rounded-xl space-x-3 w-full items-stretch max-w-md shadow-sm ${isClosed ? 'bg-green-100' : 'bg-blue-50'
                                                                    }`}
                                                            >
                                                                <div className={`${textColor} font-bold min-w-[50px] flex items-center justify-center px-1 py-1`}>
                                                                    {meeting.time}
                                                                </div>
                                                                <div className="w-px bg-blue-300 self-stretch"></div>
                                                                <div className="flex-1 min-w-0 px-1 py-1">
                                                                    <p className={`text-xs font-medium truncate ${textColor}`}>{meeting.title}</p>
                                                                    <p className={`text-[11px] ${textColor}`}>{meeting.duration}</p>
                                                                </div>
                                                                <div className="w-px bg-blue-300 self-stretch" />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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