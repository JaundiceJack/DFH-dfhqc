// Auth actions
export const USER_LOADED      = "USER_LOADED";
export const USER_LOADING     = "USER_LOADING";
export const AUTH_ERROR       = "AUTH_ERROR";
export const LOGIN_SUCCESS    = "LOGIN_SUCCESS";
export const LOGIN_FAIL       = "LOGIN_FAIL";
export const LOGOUT_SUCCESS   = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL    = "REGISTER_FAIL";
export const RESET_FAIL       = "RESET_FAIL";
export const RESET_VERIFIED   = "RESET_VERIFIED";
export const CHANGE_PAGE      = "CHANGE_PAGE";

// Message actions
export const GET_MESSAGES     = "GET_MESSAGES";
export const CLEAR_MESSAGES   = "CLEAR_MESSAGES";

// Raw actions
export const RAW_LIST_REQUEST = "RAW_LIST_REQUEST";
export const RAW_LIST_SUCCESS = "RAW_LIST_SUCCESS";
export const RAW_LIST_FAILURE = "RAW_LIST_FAILURE";
export const RAW_GET_REQUEST  = "RAW_GET_REQUEST";
export const RAW_GET_SUCCESS  = "RAW_GET_SUCCESS";
export const RAW_GET_FAILURE  = "RAW_GET_FAILURE";
export const RAW_ADD_REQUEST  = "RAW_ADD_REQUEST";
export const RAW_ADD_SUCCESS  = "RAW_ADD_SUCCESS";
export const RAW_ADD_FAILURE  = "RAW_ADD_FAILURE";
export const RAW_EDIT_REQUEST = "RAW_EDIT_REQUEST";
export const RAW_EDIT_SUCCESS = "RAW_EDIT_SUCCESS";
export const RAW_EDIT_FAILURE = "RAW_EDIT_FAILURE";
export const RAW_DELETE_REQUEST = "RAW_DELETE_REQUEST";
export const RAW_DELETE_SUCCESS = "RAW_DELETE_SUCCESS";
export const RAW_DELETE_FAILURE = "RAW_DELETE_FAILURE";
export const RAW_TOGGLE_ADDING = "RAW_TOGGLE_ADDING";
export const RAW_TOGGLE_EDITING = "RAW_TOGGLE_EDITING";
export const RAW_TOGGLE_DELETING = "RAW_TOGGLE_DELETING";
export const RAW_DIRECT_SELECT = "RAW_DIRECT_SELECT";


// Blend actions
export const BLEND_LIST_REQUEST = "BLEND_LIST_REQUEST";
export const BLEND_LIST_SUCCESS = "BLEND_LIST_SUCCESS";
export const BLEND_LIST_FAILURE = "BLEND_LIST_FAILURE";
export const BLEND_GET_REQUEST  = "BLEND_GET_REQUEST";
export const BLEND_GET_SUCCESS  = "BLEND_GET_SUCCESS";
export const BLEND_GET_FAILURE  = "BLEND_GET_FAILURE";
export const BLEND_ADD_REQUEST  = "BLEND_ADD_REQUEST";
export const BLEND_ADD_SUCCESS  = "BLEND_ADD_SUCCESS";
export const BLEND_ADD_FAILURE  = "BLEND_ADD_FAILURE";
export const BLEND_EDIT_REQUEST = "BLEND_EDIT_REQUEST";
export const BLEND_EDIT_SUCCESS = "BLEND_EDIT_SUCCESS";
export const BLEND_EDIT_FAILURE = "BLEND_EDIT_FAILURE";
export const BLEND_DELETE_REQUEST = "BLEND_DELETE_REQUEST";
export const BLEND_DELETE_SUCCESS = "BLEND_DELETE_SUCCESS";
export const BLEND_DELETE_FAILURE = "BLEND_DELETE_FAILURE";
export const BLEND_TOGGLE_ADDING = "BLEND_TOGGLE_ADDING";
export const BLEND_TOGGLE_EDITING = "BLEND_TOGGLE_EDITING";
export const BLEND_TOGGLE_DELETING = "BLEND_TOGGLE_DELETING";
export const BLEND_DIRECT_SELECT = "BLEND_DIRECT_SELECT";

// Bulk actions
export const BULK_LIST_REQUEST = "BULK_LIST_REQUEST";
export const BULK_LIST_SUCCESS = "BULK_LIST_SUCCESS";
export const BULK_LIST_FAILURE = "BULK_LIST_FAILURE";
export const BULK_GET_REQUEST  = "BULK_GET_REQUEST";
export const BULK_GET_SUCCESS  = "BULK_GET_SUCCESS";
export const BULK_GET_FAILURE  = "BULK_GET_FAILURE";
export const BULK_ADD_REQUEST  = "BULK_ADD_REQUEST";
export const BULK_ADD_SUCCESS  = "BULK_ADD_SUCCESS";
export const BULK_ADD_FAILURE  = "BULK_ADD_FAILURE";
export const BULK_EDIT_REQUEST = "BULK_EDIT_REQUEST";
export const BULK_EDIT_SUCCESS = "BULK_EDIT_SUCCESS";
export const BULK_EDIT_FAILURE = "BULK_EDIT_FAILURE";
export const BULK_DELETE_REQUEST = "BULK_DELETE_REQUEST";
export const BULK_DELETE_SUCCESS = "BULK_DELETE_SUCCESS";
export const BULK_DELETE_FAILURE = "BULK_DELETE_FAILURE";
export const BULK_TOGGLE_ADDING = "BULK_TOGGLE_ADDING";
export const BULK_TOGGLE_EDITING = "BULK_TOGGLE_EDITING";
export const BULK_TOGGLE_DELETING = "BULK_TOGGLE_DELETING";
export const BULK_DIRECT_SELECT = "BULK_DIRECT_SELECT";

// Finished Good actions
export const FG_LIST_REQUEST = "FG_LIST_REQUEST";
export const FG_LIST_SUCCESS = "FG_LIST_SUCCESS";
export const FG_LIST_FAILURE = "FG_LIST_FAILURE";
export const FG_GET_REQUEST  = "FG_GET_REQUEST";
export const FG_GET_SUCCESS  = "FG_GET_SUCCESS";
export const FG_GET_FAILURE  = "FG_GET_FAILURE";
export const FG_ADD_REQUEST  = "FG_ADD_REQUEST";
export const FG_ADD_SUCCESS  = "FG_ADD_SUCCESS";
export const FG_ADD_FAILURE  = "FG_ADD_FAILURE";
export const FG_EDIT_REQUEST = "FG_EDIT_REQUEST";
export const FG_EDIT_SUCCESS = "FG_EDIT_SUCCESS";
export const FG_EDIT_FAILURE = "FG_EDIT_FAILURE";
export const FG_DELETE_REQUEST = "FG_DELETE_REQUEST";
export const FG_DELETE_SUCCESS = "FG_DELETE_SUCCESS";
export const FG_DELETE_FAILURE = "FG_DELETE_FAILURE";
export const FG_TOGGLE_ADDING = "FG_TOGGLE_ADDING";
export const FG_TOGGLE_EDITING = "FG_TOGGLE_EDITING";
export const FG_TOGGLE_DELETING = "FG_TOGGLE_DELETING";
export const FG_DIRECT_SELECT = "FG_DIRECT_SELECT";

// Assay actions
export const LOADING_ASSAYS = "LOADING_ASSAYS";
export const ADD_ASSAY = "ADD_ASSAY";
export const GET_ASSAYS = "GET_ASSAYS";
export const ASSAY_ADDED = "ASSAY_ADDED";
export const ASSAY_EDITED = "ASSAY_EDITED";
export const ASSAY_DELETED = "ASSAY_DELETED";
export const TOGGLE_ADDING_ASSAY = "TOGGLE_ADDING_ASSAY";
export const TOGGLE_EDITING_ASSAY = "TOGGLE_EDITING_ASSAY";
export const TOGGLE_DELETING_ASSAY = "TOGGLE_DELETING_ASSAY";
export const SELECT_ASSAY = "SELECT_ASSAY";

// Identity actions
export const LOADING_IDENTITIES = "LOADING_IDENTITIES";
export const ADD_IDENTITY = "ADD_IDENTITY";
export const GET_IDENTITIES = "GET_IDENTITIES";
export const IDENTITY_ADDED = "IDENTITY_ADDED";
export const IDENTITY_EDITED = "IDENTITY_EDITED";
export const IDENTITY_DELETED = "IDENTITY_DELETED";
export const TOGGLE_ADDING_IDENTITY = "TOGGLE_ADDING_IDENTITY";
export const TOGGLE_EDITING_IDENTITY = "TOGGLE_EDITING_IDENTITY";
export const TOGGLE_DELETING_IDENTITY = "TOGGLE_DELETING_IDENTITY";
export const SELECT_IDENTITY = "SELECT_IDENTITY";

// Method actions
export const LOADING_METHODS = "LOADING_METHODS";
export const ADD_METHOD = "ADD_METHOD";
export const GET_METHODS = "GET_METHODS";
export const METHOD_ADDED = "METHOD_ADDED";
export const METHOD_EDITED = "METHOD_EDITED";
export const METHOD_DELETED = "METHOD_DELETED";
export const TOGGLE_ADDING_METHOD = "TOGGLE_ADDING_METHOD";
export const TOGGLE_EDITING_METHOD = "TOGGLE_EDITING_METHOD";
export const TOGGLE_DELETING_METHOD = "TOGGLE_DELETING_METHOD";
export const SELECT_METHOD = "SELECT_METHOD";

// Unit actions
export const LOADING_UNITS = "LOADING_UNITS";
export const ADD_UNIT = "ADD_UNIT";
export const GET_UNITS = "GET_UNITS";
export const UNIT_ADDED = "UNIT_ADDED";
export const UNIT_EDITED = "UNIT_EDITED";
export const UNIT_DELETED = "UNIT_DELETED";
export const TOGGLE_ADDING_UNIT = "TOGGLE_ADDING_UNIT";
export const TOGGLE_EDITING_UNIT = "TOGGLE_EDITING_UNIT";
export const TOGGLE_DELETING_UNIT = "TOGGLE_DELETING_UNIT";
export const SELECT_UNIT = "SELECT_UNIT";

// Texture Actions
export const LOADING_TEXTURES = "LOADING_TEXTURES";
export const ADD_TEXTURE = "ADD_TEXTURE";
export const GET_TEXTURES = "GET_TEXTURES";
export const TEXTURE_ADDED = "TEXTURE_ADDED";
export const TEXTURE_EDITED = "TEXTURE_EDITED";
export const TEXTURE_DELETED = "TEXTURE_DELETED";
export const TOGGLE_ADDING_TEXTURE = "TOGGLE_ADDING_TEXTURE";
export const TOGGLE_EDITING_TEXTURE = "TOGGLE_EDITING_TEXTURE";
export const TOGGLE_DELETING_TEXTURE = "TOGGLE_DELETING_TEXTURE";
export const SELECT_TEXTURE = "SELECT_TEXTURE";

// Lot viewing actions
export const LOADING_LOTS = "LOADING_LOTS";
export const GET_LOTS = "GET_LOTS";
export const SELECT_LOT = "SELECT_LOT";
export const LOT_GET_REQUEST = "LOT_GET_REQUEST";
export const LOT_GET_FAIL = "LOT_GET_FAIL";
export const LOT_ADDED = "LOT_ADDED";
export const LOT_ADD_REQUEST = "LOT_ADD_REQUEST";
export const LOT_ADD_FAIL = "LOT_ADD_FAIL";
export const LOT_EDITED = "LOT_EDITED";
export const LOT_EDIT_REQUEST = "LOT_EDIT_REQUEST";
export const LOT_EDIT_FAIL = "LOT_EDIT_FAIL";
export const LOT_DELETED = "LOT_DELETED";
export const LOT_DELETE_REQUEST = "LOT_DELETE_REQUEST";
export const LOT_DELETE_FAIL = "LOT_DELETE_FAIL";
export const LOT_PRIOR_SUCCESS = "LOT_PRIOR_SUCCESS";
export const TOGGLE_ADDING_LOT    = "TOGGLE_ADDING_LOT";
export const TOGGLE_EDITING_LOT   = "TOGGLE_EDITING_LOT";
export const TOGGLE_DELETING_LOT  = "TOGGLE_DELETING_LOT";
export const TOGGLE_RAW_LOTS  = "TOGGLE_RAW_LOTS";
export const TOGGLE_BLEND_LOTS  = "TOGGLE_BLEND_LOTS";
export const TOGGLE_BULK_LOTS  = "TOGGLE_BULK_LOTS";
export const TOGGLE_FG_LOTS  = "TOGGLE_FG_LOTS";
export const TOGGLE_OTHER_LOTS = "TOGGLE_OTHER_LOTS";
export const TOGGLE_MT_LOTS  = "TOGGLE_MT_LOTS";
export const TOGGLE_NV_LOTS  = "TOGGLE_NV_LOTS";
export const TOGGLE_CT_LOTS  = "TOGGLE_CT_LOTS";
export const INCREMENT_YEAR  = "INCREMENT_YEAR";
export const DECREMENT_YEAR  = "DECREMENT_YEAR";

// Lot testing actions
export const SAMPLE_LIST_REQUEST = "SAMPLE_LIST_REQUEST";
export const SAMPLE_LIST_SUCCESS = "SAMPLE_LIST_SUCCESS";
export const SAMPLE_LIST_FAIL = "SAMPLE_LIST_FAIL";
export const SAMPLE_CREATE_REQUEST = "SAMPLE_CREATE_REQUEST";
export const SAMPLE_CREATE_SUCCESS = "SAMPLE_CREATE_SUCCESS";
export const SAMPLE_CREATE_FAIL = "SAMPLE_CREATE_FAIL";
export const SAMPLE_EDIT_REQUEST = "SAMPLE_EDIT_REQUEST";
export const SAMPLE_EDIT_SUCCESS = "SAMPLE_EDIT_SUCCESS";
export const SAMPLE_EDIT_FAIL = "SAMPLE_EDIT_FAIL";
export const SAMPLE_DELETE_REQUEST = "SAMPLE_DELETE_REQUEST";
export const SAMPLE_DELETE_SUCCESS = "SAMPLE_DELETE_SUCCESS";
export const SAMPLE_DELETE_FAIL = "SAMPLE_DELETE_FAIL";
export const SAMPLES_SHOW_TESTING = "SAMPLES_SHOW_TESTING";
export const SAMPLES_SHOW_DELETING = "SAMPLES_SHOW_DELETING";
export const SAMPLES_SHOW_SAMPLING = "SAMPLES_SHOW_SAMPLING";
export const SAMPLE_PRIOR_SUCCESS = "SAMPLE_PRIOR_SUCCESS";

// Lab Actions
export const LAB_LIST_REQUEST = "LAB_LIST_REQUEST";
export const LAB_LIST_SUCCESS = "LAB_LIST_SUCCESS";
export const LAB_LIST_FAILURE = "LAB_LIST_FAILURE";
export const LAB_GET_REQUEST = "LAB_GET_REQUEST";
export const LAB_GET_SUCCESS = "LAB_GET_SUCCESS";
export const LAB_GET_FAILURE = "LAB_GET_FAILURE";
export const LAB_ADD_REQUEST = "LAB_ADD_REQUEST";
export const LAB_ADD_SUCCESS = "LAB_ADD_SUCCESS";
export const LAB_ADD_FAILURE = "LAB_ADD_FAILURE";
export const LAB_EDIT_REQUEST = "LAB_EDIT_REQUEST";
export const LAB_EDIT_SUCCESS = "LAB_EDIT_SUCCESS";
export const LAB_EDIT_FAILURE = "LAB_EDIT_FAILURE";
export const LAB_DELETE_REQUEST = "LAB_DELETE_REQUEST";
export const LAB_DELETE_SUCCESS = "LAB_DELETE_SUCCESS";
export const LAB_DELETE_FAILURE = "LAB_DELETE_FAILURE";
export const LAB_TOGGLE_ADD = "LAB_TOGGLE_ADD";
export const LAB_TOGGLE_EDIT = "LAB_TOGGLE_EDIT";
export const LAB_TOGGLE_DELETE = "LAB_TOGGLE_DELETE";
export const LAB_SELECT = "LAB_SELECT";

// Vendor Actions
export const VENDOR_LIST_REQUEST = "VENDOR_LIST_REQUEST";
export const VENDOR_LIST_SUCCESS = "VENDOR_LIST_SUCCESS";
export const VENDOR_LIST_FAILURE = "VENDOR_LIST_FAILURE";
export const VENDOR_GET_REQUEST  = "VENDOR_GET_REQUEST";
export const VENDOR_GET_SUCCESS  = "VENDOR_GET_SUCCESS";
export const VENDOR_GET_FAILURE  = "VENDOR_GET_FAILURE";
export const VENDOR_ADD_REQUEST  = "VENDOR_ADD_REQUEST";
export const VENDOR_ADD_SUCCESS  = "VENDOR_ADD_SUCCESS";
export const VENDOR_ADD_FAILURE  = "VENDOR_ADD_FAILURE";
export const VENDOR_EDIT_REQUEST = "VENDOR_EDIT_REQUEST";
export const VENDOR_EDIT_SUCCESS = "VENDOR_EDIT_SUCCESS";
export const VENDOR_EDIT_FAILURE = "VENDOR_EDIT_FAILURE";
export const VENDOR_DELETE_REQUEST = "VENDOR_DELETE_REQUEST";
export const VENDOR_DELETE_SUCCESS = "VENDOR_DELETE_SUCCESS";
export const VENDOR_DELETE_FAILURE = "VENDOR_DELETE_FAILURE";
export const VENDOR_TOGGLE_ADDING = "VENDOR_TOGGLE_ADDING";
export const VENDOR_TOGGLE_EDITING = "VENDOR_TOGGLE_EDITING";
export const VENDOR_TOGGLE_DELETING = "VENDOR_TOGGLE_DELETING";
export const VENDOR_DIRECT_SELECT = "VENDOR_DIRECT_SELECT";


// Manufacturer Actions
export const MANUFACTURER_LIST_REQUEST = "MANUFACTURER_LIST_REQUEST";
export const MANUFACTURER_LIST_SUCCESS = "MANUFACTURER_LIST_SUCCESS";
export const MANUFACTURER_LIST_FAILURE = "MANUFACTURER_LIST_FAILURE";
export const MANUFACTURER_GET_REQUEST  = "MANUFACTURER_GET_REQUEST";
export const MANUFACTURER_GET_SUCCESS  = "MANUFACTURER_GET_SUCCESS";
export const MANUFACTURER_GET_FAILURE  = "MANUFACTURER_GET_FAILURE";
export const MANUFACTURER_ADD_REQUEST  = "MANUFACTURER_ADD_REQUEST";
export const MANUFACTURER_ADD_SUCCESS  = "MANUFACTURER_ADD_SUCCESS";
export const MANUFACTURER_ADD_FAILURE  = "MANUFACTURER_ADD_FAILURE";
export const MANUFACTURER_EDIT_REQUEST = "MANUFACTURER_EDIT_REQUEST";
export const MANUFACTURER_EDIT_SUCCESS = "MANUFACTURER_EDIT_SUCCESS";
export const MANUFACTURER_EDIT_FAILURE = "MANUFACTURER_EDIT_FAILURE";
export const MANUFACTURER_DELETE_REQUEST = "MANUFACTURER_DELETE_REQUEST";
export const MANUFACTURER_DELETE_SUCCESS = "MANUFACTURER_DELETE_SUCCESS";
export const MANUFACTURER_DELETE_FAILURE = "MANUFACTURER_DELETE_FAILURE";
export const MANUFACTURER_TOGGLE_ADDING = "MANUFACTURER_TOGGLE_ADDING";
export const MANUFACTURER_TOGGLE_EDITING = "MANUFACTURER_TOGGLE_EDITING";
export const MANUFACTURER_TOGGLE_DELETING = "MANUFACTURER_TOGGLE_DELETING";
export const MANUFACTURER_DIRECT_SELECT = "MANUFACTURER_DIRECT_SELECT";
