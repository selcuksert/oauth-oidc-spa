import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

export interface Auth {

    // Observable User stream
    userSource$: Observable<User>;

    /**
     * OAuth login function
     */
    login(): void;

    /**
     * OAuth logout function
     */
    logout(): void;

    /**
     * Check whether there is an active session
     */
    isLoggedIn(): Promise<Boolean>;

    getUserInfo(): void;

    getAccessToken(): Promise<String>;
}
