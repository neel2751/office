import { useEffect, useState } from "react";
import { decryptId } from "@/actions/commonAction/commonAction";
import { usePathname, useSearchParams } from "next/navigation";

const useAuthTag = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const search = useSearchParams();
  const iv = search.get("iv");
  const authTag = search.get("authTag");

  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecryptedId = async () => {
      setLoading(true);
      if (id && iv && authTag) {
        const decryptedId = await decryptId(id, iv, authTag);
        setRes(decryptedId);
      }
      setLoading(false);
    };
    fetchDecryptedId();
  }, [id, iv, authTag]);

  return { res, id, iv, authTag, loading };
};

export default useAuthTag;
