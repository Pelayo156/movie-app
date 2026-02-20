import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "lists" | "favorites" | "watchlater"
  >("favorites");

  const menuItems = [
    { id: "lists", label: "Mi Lista", icon: faList },
    { id: "favorites", label: "Favoritos", icon: faHeart },
    { id: "watchlater", label: "Ver más tarde", icon: faClock },
  ];

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Header con info del usuario - FIJO */}
      <div className="flex-shrink-0 w-full px-10 py-6 h-44 flex flex-row items-center gap-4 bg-gradient-to-r from-cyan-900/70 to-blue-900/70 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-32 h-32 rounded-full grid place-items-center shadow-xl ring-4 ring-white/20">
          <span className="text-6xl text-white font-bold uppercase leading-none">
            {user?.username.at(0)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-white text-4xl font-bold">{user?.username}</div>
          <div className="text-white/70 text-sm">{user?.name}</div>
        </div>
      </div>

      {/* Contenedor principal - CRECE para llenar espacio disponible */}
      <div className="flex flex-1 overflow-hidden">
        {/* Menú lateral - FIJO (sin scroll) */}
        <div className="w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none" />

          <nav className="relative z-10 p-6 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`
                  w-full px-6 py-4 rounded-xl text-left
                  flex items-center gap-4
                  transition-all duration-300 ease-out
                  group relative overflow-hidden
                  ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white shadow-lg shadow-cyan-500/20"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0
                  translate-x-[-100%] group-hover:translate-x-[100%]
                  transition-transform duration-700 ease-out
                  ${activeTab === item.id ? "opacity-0" : ""}
                `}
                />

                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-2xl relative z-10"
                />
                <span className="font-medium text-lg relative z-10">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        </div>

        {/* Contenido principal - SOLO ESTO HACE SCROLL */}
        <div className="flex-1 overflow-y-auto bg-gray-900">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-white text-3xl font-bold mb-6">
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4" />
                    <h3 className="text-white font-semibold mb-2">
                      Película {i + 1}
                    </h3>
                    <p className="text-white/60 text-sm">
                      Descripción de la película...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
