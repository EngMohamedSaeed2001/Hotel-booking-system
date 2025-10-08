import supabase, { supabaseUrl } from "../services/supabase";

export async function signUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function updateCurrentUser({ fullName, avatar, password }) {
  // Update FullName OR Password
  let updatedUser;

  if (fullName) updatedUser = { data: { fullName } };
  if (password) updatedUser = { password };

  const { data, error } = await supabase.auth.updateUser(updatedUser);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // Upload Avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Update Avatar
  const { data: updatedData, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarError) throw new Error(avatarError.message);
  return updatedData;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
