import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

function CreateLink() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const createNew = searchParams.get("createNew");

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div>
            <Button
              className="bg-gradient-to-r from-[#9043E5] to-[#7B35E6] hover:from-[#9043E5]/90 hover:to-[#7B35E6]/90 text-white font-semibold"
              size="lg"
            >
              Tambah Link Baru
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateLink;
