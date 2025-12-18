import BookingForm from '../components/BookingForm';
import FAQ from '../components/FAQ';

const Book = () => {
    return (
        <div className="book-page" style={{ paddingTop: '80px', minHeight: '100vh', background: '#f1f5f9' }}>
            <BookingForm />
            <FAQ />
        </div>
    );
};

export default Book;
