import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/searchBar.css";
import { setFilters } from "../features/newsSlice";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [filters, setFiltersState] = useState({
    searchQuery: "",
    category: "general",
    startDate: "",
    endDate: "",
    author: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFiltersState({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setFilters(filters));
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
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="category">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select
              name="category"
              value={filters.category}
              onChange={handleChange}
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
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="endDate">
            <Form.Label>Đến ngày</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group controlId="author">
            <Form.Label>Tác giả</Form.Label>
            <Form.Control
              type="text"
              placeholder="VD: BBC, CNN..."
              name="author"
              value={filters.author}
              onChange={handleChange}
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
