/*---------------------------------------------------------------------
    File Name: scripts.js
---------------------------------------------------------------------*/

        function toggleAccordion(element) {
            const content = element.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                // Cerrar otros elementos
                const allContents = document.querySelectorAll('.accordion-content');
                allContents.forEach(item => item.style.display = "none");
                content.style.display = "block";
            }
        }

        $(document).ready(function () {  
            $('.carousel').carousel({
                interval: 3000 // Cambiar de imagen cada 3 segundos
            });
        });    
    
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({  
                    behavior: 'smooth'
                });  
            });
        });
    
    
        document.getElementById('loadMore').addEventListener('click', function() {
            const moreChannels = document.getElementById('more-channels');
            const largeImage = document.getElementById('large-image');
            if (moreChannels.style.display === "none") {
                moreChannels.style.display = "block"; // Muestra los canales ocultos
                largeImage.style.display = "block"; // Muestra la imagen grande    
                this.textContent = "Ver menos";
            } else {
                moreChannels.style.display = "none"; // Oculta los canales ocultos
                largeImage.style.display = "none"; // Oculta la imagen grande
                this.textContent = "Ver más";
            }
        });      
    
        function hideNavbar() {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        } 
    
        function showImage(src) {
            document.getElementById('modalImage').src = src;
            document.getElementById('imageModal').style.display = 'block';
        }
        
        function closeImage() {
            document.getElementById('imageModal').style.display = 'none';
        }
    