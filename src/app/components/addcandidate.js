'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { X, Upload, Plus, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';

const CandidateModal = ({ isOpen, onClose, initialValues, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: initialValues.firstName || '',
    lastName: initialValues.lastName || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    qualifications: initialValues.qualifications || [''],
    experience: initialValues.experience || '',
    currentPosition: initialValues.currentPosition || '',
    currentCompany: initialValues.currentCompany || '',
    jobPreferences: initialValues.jobPreferences || [''],
    status: initialValues.status || 'Applied',
    interviewDate: initialValues.interviewDate || '',
    feedback: initialValues.feedback || '',
    resume: initialValues.resume || '',
    appliedJob: initialValues.appliedJob || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'Applied', label: 'Applied' },
    { value: 'Interviewing', label: 'Interviewing' },
    { value: 'Offered', label: 'Offered' },
    { value: 'Hired', label: 'Hired' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience)){
      newErrors.experience = 'Must be a number';
    } else if (Number(formData.experience) < 0) {
      newErrors.experience = 'Must be positive';
    }
    
    if (!formData.status) newErrors.status = 'Status is required';
    
    if (['Interviewing', 'Offered'].includes(formData.status) && !formData.interviewDate) {
      newErrors.interviewDate = 'Interview date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (name, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[name]];
      newArray[index] = value;
      return {
        ...prev,
        [name]: newArray
      };
    });
  };

  const addArrayItem = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: [...prev[name], '']
    }));
  };

  const removeArrayItem = (name, index) => {
    setFormData(prev => {
      const newArray = [...prev[name]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [name]: newArray
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => submitData.append(key, item));
        } else {
          submitData.append(key, value);
        }
      });
      if (file) submitData.append('resumeFile', file);

      await onSubmit(submitData);
      toast.success('Candidate saved successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to save candidate');
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
            {initialValues._id ? 'Edit Candidate' : 'Add New Candidate'}
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
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Personal Information
                </h4>
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="John"
                />
                {errors.firstName && <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Doe"
                />
                {errors.lastName && <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="john.doe@example.com"
                />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
              </div>

              {/* Professional Information Section */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Professional Information
                </h4>
              </div>

              {/* Current Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Position</label>
                <input
                  name="currentPosition"
                  type="text"
                  value={formData.currentPosition}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Senior Developer"
                />
              </div>

              {/* Current Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
                <input
                  name="currentCompany"
                  type="text"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Tech Corp Inc."
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)*</label>
                <input
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="5"
                />
                {errors.experience && <div className="text-red-500 text-xs mt-1">{errors.experience}</div>}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                <div className="relative">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Interview Date (conditionally shown) */}
              {['Interviewing', 'Offered'].includes(formData.status) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date*</label>
                  <div className="relative">
                    <input
                      name="interviewDate"
                      type="datetime-local"
                      value={formData.interviewDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                    {errors.interviewDate && <div className="text-red-500 text-xs mt-1">{errors.interviewDate}</div>}
                  </div>
                </div>
              )}

              {/* Resume Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-10 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors bg-gray-50 hover:bg-blue-50">
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">
                        {file ? file.name : formData.resume ? 'Change file' : 'Click to upload'}
                      </span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files[0])}
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                  {file || formData.resume ? (
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setFormData(prev => ({ ...prev, resume: '' }));
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
              </div>

              {/* Qualifications (array) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <div className="space-y-3">
                  {formData.qualifications.map((qual, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        name={`qualifications.${index}`}
                        type="text"
                        value={qual}
                        onChange={(e) => handleArrayChange('qualifications', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder={`Qualification ${index + 1}`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('qualifications', index)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Remove qualification"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('qualifications')}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Qualification
                  </button>
                </div>
              </div>

              {/* Job Preferences (array) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Preferences</label>
                <div className="space-y-3">
                  {formData.jobPreferences.map((pref, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        name={`jobPreferences.${index}`}
                        type="text"
                        value={pref}
                        onChange={(e) => handleArrayChange('jobPreferences', index, e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder={`Preference ${index + 1}`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('jobPreferences', index)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Remove preference"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('jobPreferences')}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Job Preference
                  </button>
                </div>
              </div>

              {/* Feedback */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter any feedback about the candidate..."
                />
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
                  'Save Candidate'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;