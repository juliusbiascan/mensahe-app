'use client';

import {
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { User } from '@prisma/client';
import { Button } from '../ui/button';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Modal } from '@/components/ui/modal';
import axios from 'axios';
import { Input } from '../ui/input';

import { z } from 'zod';
import { groupChatSchema } from '@/lib/validations/gc';
import Select from '../inputs/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactSelect from 'react-select';

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

type FormData = z.infer<typeof groupChatSchema>

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users = []
}) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(groupChatSchema),
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = form.watch('members');

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }

  return (

    <Modal
      title="Create a group chat"
      description="Create a chat with more than 2 people."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} placeholder="Group Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Select
                  disabled={isLoading}
                  label="Members"
                  options={users.map((user) => ({
                    value: user.id,
                    label: user.name
                  }))}
                  onChange={(value) => form.setValue('members', value, {
                    shouldValidate: true
                  })}
                  value={members}
                />

                <ReactSelect
                  isDisabled={isLoading}
                  value={members}
                  options={
                    users?.map((user) => ({
                      value: user?.id,
                      label: user?.name
                    }))
                  }
                  onChange={(value) => {
                    form.setValue('members', value, {
                      shouldValidate: true
                    })
                  }
                  }
                  isMulti
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 })
                  }}
                  classNames={{
                    control: () => 'text-sm',
                  }}
                />

                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={isLoading} variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">Create</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal >
  )
}

export default GroupChatModal;
