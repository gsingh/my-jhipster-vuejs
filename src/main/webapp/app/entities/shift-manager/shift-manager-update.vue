<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillvuejsApp.shiftManager.home.createOrEditLabel">Create or edit a ShiftManager</h2>
                <div>
                    <div class="form-group" v-if="shiftManager.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="shiftManager.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shift-manager-name">Name</label>
                        <input type="text" class="form-control" name="name" id="shift-manager-name"
                            :class="{'valid': !$v.shiftManager.name.$invalid, 'invalid': $v.shiftManager.name.$invalid }" v-model="$v.shiftManager.name.$model"  required/>
                        <div v-if="$v.shiftManager.name.$anyDirty && $v.shiftManager.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.shiftManager.name.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shift-manager-designation">Designation</label>
                        <input type="text" class="form-control" name="designation" id="shift-manager-designation"
                            :class="{'valid': !$v.shiftManager.designation.$invalid, 'invalid': $v.shiftManager.designation.$invalid }" v-model="$v.shiftManager.designation.$model"  required/>
                        <div v-if="$v.shiftManager.designation.$anyDirty && $v.shiftManager.designation.$invalid">
                            <small class="form-text text-danger" v-if="!$v.shiftManager.designation.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="shift-manager-mobileNumber">Mobile Number</label>
                        <input type="text" class="form-control" name="mobileNumber" id="shift-manager-mobileNumber"
                            :class="{'valid': !$v.shiftManager.mobileNumber.$invalid, 'invalid': $v.shiftManager.mobileNumber.$invalid }" v-model="$v.shiftManager.mobileNumber.$model"  required/>
                        <div v-if="$v.shiftManager.mobileNumber.$anyDirty && $v.shiftManager.mobileNumber.$invalid">
                            <small class="form-text text-danger" v-if="!$v.shiftManager.mobileNumber.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.shiftManager.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./shift-manager-update.component.ts">
</script>
