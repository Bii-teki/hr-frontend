'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { X, Plus, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';

const JobsModal = ({ isOpen, onClose, initialValues, onSubmit }) => {
    const [formValues, setFormValues] = useState({
        title: initialValues.title || '',
        description: initialValues.description || '',
        requirements: initialValues.requirements || [''],
        employmentType: initialValues.employmentType || 'Full-time',
        responsibilities: initialValues.responsibilities || [''],
        department: initialValues.department || '',
        location: initialValues.location || '',
        experienceLevel: initialValues.experienceLevel || 'Senior',
        salaryRange: {
            min: initialValues.salaryRange?.min || 0,
            max: initialValues.salaryRange?.max || 0,
        },
        deadline: initialValues.deadline || '',
        isActive: initialValues.isActive ?? true,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const employmentTypes = [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Freelance', label: 'Freelance' },
        { value: 'Internship', label: 'Internship' },
    ];

    const experienceLevels = [
        { value: 'Entry', label: 'Entry Level' },
        { value: 'Mid', label: 'Mid Level' },
        { value: 'Senior', label: 'Senior' },
        { value: 'Lead', label: 'Lead' },
        { value: 'Executive', label: 'Executive' },
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.title.trim()) newErrors.title = 'Job title is required';
        if (!formValues.description.trim()) newErrors.description = 'Description is required';
        if (!formValues.department.trim()) newErrors.department = 'Department is required';
        if (!formValues.location.trim()) newErrors.location = 'Location is required';
        if (!formValues.employmentType) newErrors.employmentType = 'Employment type is required';
        if (!formValues.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
        if (!formValues.deadline) newErrors.deadline = 'Application deadline is required';
        
        if (isNaN(formValues.salaryRange.min)) {
            newErrors['salaryRange.min'] = 'Must be a number';
        } else if (!formValues.salaryRange.min && formValues.salaryRange.min !== 0) {
            newErrors['salaryRange.min'] = 'Minimum salary is required';
        }
        
        if (isNaN(formValues.salaryRange.max)) {
            newErrors['salaryRange.max'] = 'Must be a number';
        } else if (!formValues.salaryRange.max && formValues.salaryRange.max !== 0) {
            newErrors['salaryRange.max'] = 'Maximum salary is required';
        } else if (parseFloat(formValues.salaryRange.max) < parseFloat(formValues.salaryRange.min)) {
            newErrors['salaryRange.max'] = 'Max salary must be greater than min';
        }

        if (formValues.isActive === undefined || formValues.isActive === null) {
            newErrors.isActive = 'Status is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormValues(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'number' ? parseFloat(value) : value
                }
            }));
        } else {
            setFormValues(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleArrayChange = (arrayName, index, value) => {
        setFormValues(prev => {
            const newArray = [...prev[arrayName]];
            newArray[index] = value;
            return {
                ...prev,
                [arrayName]: newArray
            };
        });
    };

    const addArrayItem = (arrayName) => {
        setFormValues(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], '']
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormValues(prev => {
            const newArray = [...prev[arrayName]];
            newArray.splice(index, 1);
            return {
                ...prev,
                [arrayName]: newArray
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            const formattedValues = {
                ...formValues,
                requirements: formValues.requirements.filter(req => req.trim() !== ''),
                responsibilities: formValues.responsibilities.filter(resp => resp.trim() !== ''),
            };

            await onSubmit(formattedValues);
            toast.success('Job posting saved successfully!');
            onClose();
        } catch (error) {
            console.error('Error saving job posting:', error);
            toast.error(error.message || 'Failed to save job posting');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="inline-block w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all"
                onClick={handleModalClick}
            >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">
                        {initialValues._id ? 'Edit Job Posting' : 'Create New Job Posting'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Information Section */}
                            <div className="md:col-span-2">
                                <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    Basic Information
                                </h4>
                            </div>

                            {/* Job Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={formValues.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Senior Software Engineer"
                                />
                                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                                <textarea
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Detailed job description..."
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                                <input
                                    name="department"
                                    type="text"
                                    value={formValues.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Engineering"
                                />
                                {errors.department && <div className="text-red-500 text-xs mt-1">{errors.department}</div>}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                                <input
                                    name="location"
                                    type="text"
                                    value={formValues.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    placeholder="Remote"
                                />
                                {errors.location && <div className="text-red-500 text-xs mt-1">{errors.location}</div>}
                            </div>

                            {/* Employment Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type*</label>
                                <div className="relative">
                                    <select
                                        name="employmentType"
                                        value={formValues.employmentType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                                    >
                                        {employmentTypes.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.employmentType && <div className="text-red-500 text-xs mt-1">{errors.employmentType}</div>}
                            </div>

                            {/* Experience Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level*</label>
                                <div className="relative">
                                    <select
                                        name="experienceLevel"
                                        value={formValues.experienceLevel}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                                    >
                                        {experienceLevels.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.experienceLevel && <div className="text-red-500 text-xs mt-1">{errors.experienceLevel}</div>}
                            </div>

                            {/* Salary Range */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range*</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            name="salaryRange.min"
                                            type="number"
                                            value={formValues.salaryRange.min}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Minimum"
                                        />
                                        {errors['salaryRange.min'] && <div className="text-red-500 text-xs mt-1">{errors['salaryRange.min']}</div>}
                                    </div>
                                    <div>
                                        <input
                                            name="salaryRange.max"
                                            type="number"
                                            value={formValues.salaryRange.max}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            placeholder="Maximum"
                                        />
                                        {errors['salaryRange.max'] && <div className="text-red-500 text-xs mt-1">{errors['salaryRange.max']}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline*</label>
                                <div className="relative">
                                    <input
                                        name="deadline"
                                        type="date"
                                        value={formValues.deadline}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                    <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                                    {errors.deadline && <div className="text-red-500 text-xs mt-1">{errors.deadline}</div>}
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                                <div className="flex items-center gap-3 mt-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="isActive"
                                            checked={formValues.isActive === true}
                                            onChange={() => setFormValues(prev => ({ ...prev, isActive: true }))}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-gray-700">Active</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="isActive"
                                            checked={formValues.isActive === false}
                                            onChange={() => setFormValues(prev => ({ ...prev, isActive: false }))}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-gray-700">Inactive</span>
                                    </label>
                                </div>
                                {errors.isActive && <div className="text-red-500 text-xs mt-1">{errors.isActive}</div>}
                            </div>

                            {/* Requirements Section */}
                            <div className="md:col-span-2">
                                <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    Requirements
                                </h4>
                                <div className="space-y-3">
                                    {formValues.requirements.map((req, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <input
                                                value={req}
                                                onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                                                type="text"
                                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder={`Requirement ${index + 1}`}
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('requirements', index)}
                                                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                                                    aria-label="Remove requirement"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('requirements')}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Requirement
                                    </button>
                                </div>
                            </div>

                            {/* Responsibilities Section */}
                            <div className="md:col-span-2">
                                <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                    Responsibilities
                                </h4>
                                <div className="space-y-3">
                                    {formValues.responsibilities.map((resp, index) => (
                                        <div key={index} className="flex gap-2 items-center">
                                            <input
                                                value={resp}
                                                onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                                                type="text"
                                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder={`Responsibility ${index + 1}`}
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayItem('responsibilities', index)}
                                                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                                                    aria-label="Remove responsibility"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => addArrayItem('responsibilities')}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                    >
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Responsibility
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    initialValues._id ? 'Update Job' : 'Create Job'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobsModal;