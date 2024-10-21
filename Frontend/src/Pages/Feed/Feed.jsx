import { useEffect, useState } from "react";
import Post from "../../Components/Post/Post";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getPosts } from "../../Services/PostsService";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error al obtener los posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Función para ordenar los posts en orden cronológico
    const ordenCronologico = (list) => {
        return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const testButtons = [
        {
            image: "",
            altText: "Botón de Prueba",
            action: () => {
                alert("¡Clickeaste el botón de prueba! :D");
            },
        },
    ];

    if (loading) return <p>Cargando posts...</p>; // Muestra un mensaje mientras carga

    console.log(posts);
    return (
        <>
            <Header title="Fakestagram" buttons={testButtons} />
            {ordenCronologico(posts).map((post) => (
                <Post key={post.id} postData={post} />
            ))}
            <Footer />
        </>
    );
};

export default Feed;
