import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import Link from "next/link";

export function OtherSettings() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Other Settings
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Other Settings</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <Link href="/drive-tagger.exe">
            <div className="grid gap-2">
              <Button className="cursor-pointer">Download Tagger</Button>
              <p className="text-sm">
                Download application for tagging all Google Drive files
              </p>
            </div>
          </Link>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
