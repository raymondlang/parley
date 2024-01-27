require "test_helper"

class WorkspacesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get workspaces_index_url
    assert_response :success
  end

  test "should get show" do
    get workspaces_show_url
    assert_response :success
  end

  test "should get create" do
    get workspaces_create_url
    assert_response :success
  end

  test "should get update" do
    get workspaces_update_url
    assert_response :success
  end

  test "should get delete" do
    get workspaces_delete_url
    assert_response :success
  end
end
