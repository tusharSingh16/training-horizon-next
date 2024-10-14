"use client";
import React, { useState } from 'react';
import Navbar from '@/components/UserFlow/NavBar';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for form validation
const registerMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z
    .number()
    .int({ message: 'Age must be a valid integer' })
    .min(0, 'Age must be greater than 0'),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  relationship: z.enum(['brother', 'child', 'father', 'mother'], 'Select a valid relationship'),
  doctorName: z.string().optional(),
  doctorNumber: z.string().optional(),
  bloodGroup: z.string().optional(),
});

const RegisterMemberForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(registerMemberSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    reset(); // Reset the form after successful submission
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-8 mt-10 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register Family Member</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter member's name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm border ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter age"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm border ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship</label>
            <select
              {...register("relationship")}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm border ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select relationship</option>
              <option value="brother">Brother</option>
              <option value="child">Child</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
            </select>
            {errors.relationship && <p className="text-red-500 text-sm">{errors.relationship.message}</p>}
          </div>

          {/* Doctor's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor's Name (Optional)</label>
            <input
              {...register("doctorName")}
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300"
              placeholder="Enter doctor's name"
            />
          </div>

          {/* Doctor's Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor's Number (Optional)</label>
            <input
              type="tel"
              {...register("doctorNumber")}
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300"
              placeholder="Enter doctor's number"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group (Optional)</label>
            <input
              {...register("bloodGroup")}
              className="mt-1 block w-full px-4 py-2 rounded-md shadow-sm border border-gray-300"
              placeholder="Enter blood group"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterMemberForm;
