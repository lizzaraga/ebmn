import { getModule } from "nuxt-property-decorator"
import AuthStore from "~/store/auth-store"

export default function({ store, redirect }) {
    const authStore = getModule(AuthStore, store)
        // If the user is not authenticated
    if (authStore.user.token == undefined) {
        return redirect('/login')
    }
}