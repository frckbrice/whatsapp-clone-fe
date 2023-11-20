import { useWhatSappContext } from "@/components/context";
import { supabase } from "../supabase/client";
import { LOCAL_STORAGE } from "../service/storage";

export const uploadGroupIcon = async (file: any) => {
  const { setGroupIcon } = useWhatSappContext();

  const fileValue = `avatar${Date.now()}.png`;
  const { error } = await supabase.storage
    .from("whatsapp_avatars/images")
    .upload(fileValue, file);
  if (error) {
    console.error(error);
    return;
  }
  const { data } = supabase.storage
    .from("whatsapp_avatars/images")
    .getPublicUrl(fileValue);
  if (data) {
    setGroupIcon(data.publicUrl);
    LOCAL_STORAGE.save("groupIcon", data.publicUrl);
    console.clear();
    console.log("Group Icon", data.publicUrl);
    return data.publicUrl;
  }
  // setProfileImage(publicUrl as unknown as string);
  // setProfileImage(data.publicUrl);
  // setProfilPict(data.publicUrl);
  // setProfileImage(data.publicUrl);
  // LOCAL_STORAGE.save("imageURL", data.publicUrl);
  // updateUserAvatar(data.publicUrl);
  // console.log("this is your profile picture");
  // setImportPict(false);
};
