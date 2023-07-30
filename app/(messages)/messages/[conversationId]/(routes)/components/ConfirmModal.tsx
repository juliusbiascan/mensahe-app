'use client';

import React, { useCallback, useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import useConversation from '@/hooks/useConversation';
import { toast } from 'react-hot-toast';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose
}) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios.delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push('/conversations');
        router.refresh();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }, [router, conversationId, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'Delete conversation'}
      description={'Are you sure you want to delete this conversation? This action cannot be undone.'}>


      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        
        <Button
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          disabled={isLoading}
          variant={'destructive'}
          onClick={onDelete}
        >
          Delete
        </Button>

      </div>
    </Modal>
  )
}

export default ConfirmModal;
