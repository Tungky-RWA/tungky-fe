import { Button } from "@/components/UI/button"
import ButtonCustom from "../UI/ButtonCustom" 
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog"
import { Badge } from "@/components/UI/badge"
import { FileText, Download } from "lucide-react"
import { useRegisterBrand } from "@/hooks/useRegisterBrand"
import toast from 'react-hot-toast'
import { CONTRACT_TEMP } from "@/lib/constants"
import { useEffect } from "react"

export default function BrandReviewDialog({ children, brandData }: any) {
  const { isRegistering, approveRegisteredBrand } = useRegisterBrand({
    onSuccess: () => {
      toast.dismiss();
      toast.success('Approve Success')
    },
    onError: (error: any) => {
      toast.dismiss();
      const message = error?.shortMessage ?? "An error occurred.";
      toast.error(`Approve failed: ${message}`);
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] text-white neon-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Review Brand Application</DialogTitle>
          <DialogDescription>Review the brand details and documentation before approval.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Brand Details Section */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Brand Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Brand Name</label>
                <p className="text-sm font-semibold">{brandData?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Industry</label>
                <p className="text-sm">Technology & Software</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Registration Date</label>
                <p className="text-sm">{brandData?.blockTimestamp
                  ? new Date(brandData.blockTimestamp * 1000).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : 'Loading...'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mr-4">Status</label>
                <Badge variant="secondary">Pending Review</Badge>
              </div>
            </div>
          </div>

          {/* Document Section */}
          <div className="grid gap-3">
            <h3 className="text-lg font-semibold">Supporting Documents</h3>
            <div className="border-2 border-dashed rounded-lg p-6 neon-border crypto-glass">
              <div className="flex items-center justify-center flex-col gap-3">
                <FileText className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <p className="text-sm font-medium">Brand Registration Certificate</p>
                  <p className="text-xs text-gray-500">techcorp-brand-certificate.pdf</p>
                  <p className="text-xs text-gray-500">2.4 MB • Uploaded 2 days ago</p>
                </div>
                <ButtonCustom variant="outline" size="sm" className="mt-2 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <ButtonCustom variant="outline">Close</ButtonCustom>
          </DialogClose>
          <ButtonCustom
            onClick={() => approveRegisteredBrand(brandData.BrandWalletAddress, CONTRACT_TEMP)}
            disabled={isRegistering}
          >
            Approve Brand
          </ButtonCustom>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
