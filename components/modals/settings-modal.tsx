'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { CldUploadButton } from 'next-cloudinary';
import { Modal } from '@/components/ui/modal';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { userNameSchema } from '@/lib/validations/user';
import { z } from 'zod';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

type FormData = z.infer<typeof userNameSchema>

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: currentUser?.name || '',
      image: currentUser?.image || ''
    }
  });

  const image = form.watch('image');

  const handleUpload = (result: any) => {
    form.setValue('image', result.info.secure_url, {
      shouldValidate: true
    });
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'Profile'}
      description={'Edit your public information.'}>

      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-5'>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={isLoading} placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <label
                      htmlFor="photo"
                      className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-primary
                  "
                    >
                      Photo
                    </label>

                    <div className="mt-2 flex items-center gap-x-3">
                      <Image
                        width="48"
                        height="48"
                        className="rounded-full"
                        src={image || currentUser?.image || '/images/placeholder.jpg'}
                        alt="Avatar"
                      />
                      <CldUploadButton
                        options={{ maxFiles: 1 }}
                        onUpload={handleUpload}
                        uploadPreset="pgc9ehd5"
                      >
                        <Button
                          disabled={isLoading}
                          variant={'ghost'}
                          type="button"
                        >
                          Change
                        </Button>
                      </CldUploadButton>
                    </div>
                  </div>
                </div>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={isLoading} variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">Save</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SettingsModal;