import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ReportIssueModalProps {
  open: boolean;
  onClose: () => void;
  userRole: string;
  userEmail: string;
}

const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ open, onClose, userRole, userEmail }) => {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);

    // Simulate issue submission (replace with real submission logic)
    console.log('Issue reported:', { description, email, userRole });

    setTimeout(() => {
      setSubmitting(false);
      setDescription('');
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Report Technical Issue</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              disabled={submitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Issue Description</Label>
            <Textarea
              id="description"
              rows={6}
              placeholder="Describe the issue you're facing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || !description}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportIssueModal;