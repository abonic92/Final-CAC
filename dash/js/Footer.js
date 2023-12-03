export default {
    data() {
        return {
            currentYear: new Date().getFullYear(),
        };
    },
    template: `
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; {{ currentYear }} Teatro La Sala</span>
            </div>
        </div>
    </footer>
    `,
};