import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Espacio principal para información del usuario */}
      <div className="w-full px-10 py-6 h-44 flex flex-row items-center gap-4 bg-cyan-900/70">
        {/* Avatar de usuario */}
        <div className="bg-black/50 w-32 h-32 rounded-full grid place-items-center">
          <span className="text-6xl text-white font-medium uppercase leading-none">
            {user?.username.at(0)}
          </span>
        </div>

        {/* Nombre */}
        <div className="text-white text-4xl font-bold">{user?.username}</div>
      </div>
      {/* Menú para ver lista, favoritos y ver más tarde  */}
      <div className="flex h-screen w-full bg-gray-900 text-white overflow-hidden">
        <div className="w-1/4 h-full bg-white/5 backdrop-blur-xl border-r border-white/10 relative z-20">
          <button>Lista</button>
          <button>Favoritos</button>
          <button>Ver más tarde</button>
        </div>

        <div className="w-3/4 h-full overflow-y-auto relative z-10">hola</div>
      </div>
    </div>
  );
}
export default ProfilePage;
