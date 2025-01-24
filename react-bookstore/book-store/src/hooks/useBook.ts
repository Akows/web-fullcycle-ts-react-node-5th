import { useEffect, useState } from "react";
import {
    BookDetail,
    BookReviewItem,
    BookReviewItemWrite,
} from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { addBookReview, fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const { isloggedIn } = useAuthStore();
    const [cartAdded, setCartAdded] = useState(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);

    const { showAlert } = useAlert();

    const { showToast } = useToast();

    const likeToggle = () => {
        if (!isloggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }
        if (!book) return;

        if (book.liked) {
            //라이크 상태 -> 언라이크 실행
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                });
                showToast("좋아요가 취소되었습니다.");
            });
        } else {
            // 언라이크 상태 -> 라이크를 실행
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                });
                showToast("좋아요가 추가되었습니다.");
            });
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) return;

        addCart({
            book_id: book.id,
            quantity: quantity,
        }).then(() => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    };

    useEffect(() => {
        if (!bookId) return;

        fetchBook(bookId).then((book) => {
            setBook(book);
        });

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews);
        });
    }, [bookId]);

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return;

        addBookReview(book.id.toString(), data).then((res) => {
            // fetchBookReview(book.id.toString()).then((reviews) => {
            //     setReviews(reviews);
            // });
            showAlert(res.message);
        });
    };

    return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
