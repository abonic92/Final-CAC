export default {
    data() {
        return {
            footerLinks: [
                { label: 'Inicio', link: '/index.html' },
                { label: 'Acerca de nosotros', link: '/about.html' },
            ],
            currentYear: new Date().getFullYear(),
        };
    },
    template: `
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span v-for="(link, index) in footerLinks" :key="index">
                    <a :href="link.link">{{ link.label }}</a>
                    <span v-if="index < footerLinks.length - 1"> | </span>
                </span>
                <br>
                <span>Copyright &copy; {{ currentYear }} Your Website</span>
            </div>
        </div>
    </footer>
    `,
};