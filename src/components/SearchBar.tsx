import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAuthor,
  setCategory,
  setEndDate,
  setSearchQuery,
  setStartDate,
} from "../features/newsSlice";
import "../styles/searchBar.css";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBar = () => {
  const dispatch = useDispatch();
  // const [value, setValue] = useState("");

  const [query, setQuery] = useState("");
  const [category, setLocalCategory] = useState("general");
  const [start, setLocalStart] = useState("");
  const [end, setLocalEnd] = useState("");
  const [author, setLocalAuthor] = useState("");

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     dispatch(setSearchQuery(value));
  //   }, 300);
  //   return () => clearTimeout(timeoutId);
  // }, [value, dispatch]);

  // const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  // };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(query));
    dispatch(setCategory(category));
    dispatch(setStartDate(start));
    dispatch(setEndDate(end));
    dispatch(setAuthor(author));
  };

  return (
    <Form onSubmit={handleSubmit} className="search-bar p-3 bg-light">
      <Row className="g-2">
        <Col md={3}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Từ khoá</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập từ khoá..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="category">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setLocalCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
              {/* Thêm các danh mục khác nếu muốn */}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="startDate">
            <Form.Label>Từ ngày</Form.Label>
            <Form.Control
              type="date"
              value={start}
              onChange={(e) => setLocalStart(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="endDate">
            <Form.Label>Đến ngày</Form.Label>
            <Form.Control
              type="date"
              value={end}
              onChange={(e) => setLocalEnd(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="author">
            <Form.Label>Tác giả</Form.Label>
            <Form.Control
              type="text"
              placeholder="VD: BBC, CNN..."
              value={author}
              onChange={(e) => setLocalAuthor(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={12} className="mt-3">
          <Button variant="primary" type="submit">
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
