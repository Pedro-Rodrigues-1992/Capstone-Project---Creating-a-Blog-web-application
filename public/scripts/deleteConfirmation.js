
function confirmDelete(title) {
    if (confirm("Are you sure you want to delete this post?")) {
        fetch(`/delete/${title}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    window.location.href = "/";
                } else {
                    alert("Failed to delete post.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
