import React, { useRef, useState } from "react";
import { Typography, Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "../../../../../redux/api/api";
import AddServicesModal from "../../../../../components/common/AddServiceModal";
import EditServiceModal from "../../../../../components/common/EditServiceModal";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

interface ServiceDataType {
  key: string;
  name: string;
  image: string;
  price: number;
  duration: string;
}

type DataIndex = keyof ServiceDataType;

const AllServices: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [addServiceModalOpen, setAddServiceModalOpen] = useState(false);
  const [updateServiceModalOpen, setUpdateServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceDataType | null>(null);

  const [deleteService] = useDeleteServiceMutation();

  // Fetching data from API
  const {
    data: apiData,
    isLoading,
    refetch: refetchServices,
    isError,
  } = useGetAllServicesQuery(undefined);

  // Mapping API data to table data
  const servicesData: ServiceDataType[] =
    apiData?.data?.map((service: any) => ({
      key: service._id,
      name: service.name,
      image: service.image,
      price: service.price,
      duration: service.duration,
    })) || [];

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleServiceDelete = (id: any) => {
    console.log("delete", id);

    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteService(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            refetchServices();
          });
        }
      });
    } catch (error) {
      console.log("Error deleting service:", error);
      Swal.fire("Error", "Failed to delete service", "error");
    }
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<ServiceDataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (open) => {
      if (open) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<ServiceDataType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Service" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Service Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps("price"),
    },
    {
      title: "Service Duration (mins)",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => parseInt(a.duration) - parseInt(b.duration),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedService(record); // Set the selected service data
              setUpdateServiceModalOpen(true); // Open the edit modal
            }}
            type="link"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleServiceDelete(record.key)}
            type="link"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text type="danger">Failed to load services</Text>;

  return (
    <>
      <div>
        <div>
          <Title level={3} style={{ textAlign: "center", marginBottom: "8px" }}>
            All Services
          </Title>
          <Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Manage your services
          </Text>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setAddServiceModalOpen(true)}
            className="bg-violet-500 text-white px-4 py-2 rounded"
          >
            Add Service
          </button>
        </div>
        <Table<ServiceDataType>
          columns={columns}
          dataSource={servicesData}
          rowKey="key"
        />
      </div>
      {addServiceModalOpen && (
        <AddServicesModal
          open={addServiceModalOpen}
          hideModal={() => setAddServiceModalOpen(false)}
          // data={servicesData[0]}
          refetchServices={refetchServices}
        />
      )}

      {updateServiceModalOpen && (
        <EditServiceModal
          open={updateServiceModalOpen}
          hideModal={() => setUpdateServiceModalOpen(false)}
          refetchServices={refetchServices}
          defaultValues={selectedService}
        />
      )}
    </>
  );
};

export default AllServices;
