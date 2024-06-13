import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { usersApi } from "../../Api/users";

const UserList: React.FC = () => {
    const [user, setUser] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        usersApi()
            .then((data: any) => {
                setUser(data);
                setLoading(false);
            })
            .catch((error: any) => {
                console.error("erreur lors de la récupération des données :", error);
                setError("Impossible de charger les données");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {user.length > 0 ? (
                <table className="border-collapse border-2 border-gray-500 mt-5 w-full">
                    <thead>
                        <tr>
                            <th className="border-2 border-gray-500 text-center p-2">Username</th>
                            <th className="border-2 border-gray-500 text-center p-2">Email</th>
                            <th className="border-2 border-gray-500 text-center p-2">Action</th>
                            </tr>
                    </thead>
                    <tbody className="border-2 border-gray-500">
                        {user.map((user: any, index: number) => (
                            <tr key={index} className="border-2 border-gray-500">
                                <td className="border-2 border-gray-500 text-center p-2">{user.username}</td>
                                <td className="border-2 border-gray-500 text-center p-2">{user.email}</td>
                                <td className="border-2 border-gray-500 text-center p-2 space-x-2">
                                    <Link to={`/api/user/edit/${user.id}`}>
                                        <button className="bg-blue-500 p-2 rounded-md">Edit</button>
                                    </Link>
                                    <Link to={`/api/user/delete/${user.id}`}>
                                    <button className="bg-red-500 p-2 rounded-md">Delete</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                <p>Aucun utilisateur trouvé</p>
                <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default UserList;