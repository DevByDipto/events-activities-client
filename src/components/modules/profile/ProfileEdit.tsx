"use client"
import EditProfileModal from '@/components/shared/EditProfileModal'
import { Button } from '@/components/ui/button'
import { revalidatePathFunction } from '@/services/event/eventDetails'
import updateUserProfile from '@/services/user/updateUserProfile'
import { User } from '@/types'
import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const ProfileEdit = ({isOwnProfile,currentUser,}) => {
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);
       const [isLoading, setIsLoading] = useState(false);
        useEffect(()=>{
          async function fetchData() {
        await revalidatePathFunction(`my-profile`)
          }
          fetchData()
        },[isLoading])


 const handleSaveProfile =async (updates: Partial<User>) => {
    if (isOwnProfile) {
        console.log(updates);
        
      const result = await updateUserProfile(updates)
      console.log("result",result);
      
    }
  };

  return (
    <div>
          {isOwnProfile && (
                <Button
                  variant="outline"
                  leftIcon={<Edit className="w-4 h-4" />}
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit Profile
                </Button>
              )}
                {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={currentUser}
          onSave={handleSaveProfile}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  )
}

export default ProfileEdit