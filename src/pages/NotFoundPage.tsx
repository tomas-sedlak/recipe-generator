import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFoundPage() {
    return (
        <div className="flex-grow max-w-screen-lg mx-auto px-4 my-8 flex flex-col items-center justify-center text-center">
            <h1 className="text-8xl font-bold tracking-tighter">404</h1>
            <h2 className="text-lg mt-4">This page has crumbled away...</h2>
            <Link to="/" className="mt-4">
                <Button>
                    <ArrowLeftIcon className="w-5 h-5 -ml-1" />
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}