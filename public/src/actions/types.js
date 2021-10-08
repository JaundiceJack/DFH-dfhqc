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
export const LOADING_RAWS = "LOADING_RAWS";
export const GET_OPTIONS      = "GET_OPTIONS";
export const GET_RAWS         = "GET_RAWS";
export const SELECT_RAW       = "SELECT_RAW";
export const RAW_ADDED        = "RAW_ADDED";
export const RAW_EDITED       = "RAW_EDITED";
export const RAW_DELETED      = "RAW_DELETED";
export const TOGGLE_ADDING_RAW    = "TOGGLE_ADDING_RAW";
export const TOGGLE_EDITING_RAW   = "TOGGLE_EDITING_RAW";
export const TOGGLE_DELETING_RAW  = "TOGGLE_DELETING_RAW";

// Blend actions
export const LOADING_BLENDS = "LOADING_BLENDS";
export const GET_BLENDS       = "GET_BLENDS";
export const SELECT_BLEND     = "SELECT_BLEND";
export const BLEND_ADDED      = "BLEND_ADDED";
export const BLEND_EDITED     = "BLEND_EDITED";
export const BLEND_DELETED    = "BLEND_DELETED";
export const TOGGLE_ADDING_BLEND   = "TOGGLE_ADDING_BLEND";
export const TOGGLE_EDITING_BLEND  = "TOGGLE_EDITING_BLEND";
export const TOGGLE_DELETING_BLEND = "TOGGLE_DELETING_BLEND";

// Bulk actions
export const LOADING_BULKS = "LOADING_BULKS";
export const GET_BULKS       = "GET_BULKS";
export const SELECT_BULK     = "SELECT_BULK";
export const BULK_ADDED      = "BULK_ADDED";
export const BULK_EDITED     = "BULK_EDITED";
export const BULK_DELETED    = "BULK_DELETED";
export const TOGGLE_ADDING_BULK   = "TOGGLE_ADDING_BULK";
export const TOGGLE_EDITING_BULK  = "TOGGLE_EDITING_BULK";
export const TOGGLE_DELETING_BULK = "TOGGLE_DELETING_BULK";

// Finished Good actions
export const LOADING_FGS = "LOADING_FGS";
export const GET_FGS       = "GET_FGS";
export const SELECT_FG     = "SELECT_FG";
export const FG_ADDED      = "FG_ADDED";
export const FG_EDITED     = "FG_EDITED";
export const FG_DELETED    = "FG_DELETED";
export const TOGGLE_ADDING_FG   = "TOGGLE_ADDING_FG";
export const TOGGLE_EDITING_FG  = "TOGGLE_EDITING_FG";
export const TOGGLE_DELETING_FG = "TOGGLE_DELETING_FG";

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
export const LOT_ADDED = "LOT_ADDED";
export const LOT_EDITED = "LOT_EDITED";
export const LOT_DELETED = "LOT_DELETED";
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
export const LOT_SAMPLED = "LOT_SAMPLED";
export const LOT_UNSAMPLED = "LOT_UNSAMPLED";
export const LOT_TESTED = "LOT_TESTED";
export const LOT_UNTESTED = "LOT_UNTESTED";

// Lab Actions
export const LOADING_LABS = "LOADING_LABS";
export const GET_LABS = "GET_LABS";
export const LAB_ADDED = "LAB_ADDED";
export const LAB_EDITED = "LAB_EDITED";
export const LAB_DELETED = "LAB_DELETED";
export const TOGGLE_ADDING_LAB = "TOGGLE_ADDING_LAB";
export const TOGGLE_EDITING_LAB = "TOGGLE_EDITING_LAB";
export const TOGGLE_DELETING_LAB = "TOGGLE_DELETING_LAB";
export const SELECT_LAB = "SELECT_LAB";
